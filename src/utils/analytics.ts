import { supabase } from '../lib/supabase';

export interface AnalyticsEvent {
    id: string;
    type: 'quiz_start' | 'quiz_progress' | 'quiz_complete' | 'view_result' | 'click_checkout' | 'payment_confirmed';
    payload?: any;
    timestamp: number;
    sessionId: string;
}

// Simple session ID generator
const getSessionId = () => {
    let sid = sessionStorage.getItem('quiz_session_id');
    if (!sid) {
        sid = Math.random().toString(36).substring(2) + Date.now().toString(36);
        sessionStorage.setItem('quiz_session_id', sid);
    }
    return sid;
};

export const trackEvent = async (type: AnalyticsEvent['type'], payload?: any) => {
    try {
        await supabase.from('quiz_events').insert({
            session_id: getSessionId(),
            event_type: type,
            payload: payload
        });
    } catch (error) {
        console.error('Error tracking event:', error);
    }
};

export const getMetrics = async () => {
    const { data: events, error } = await supabase
        .from('quiz_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5000); // Analyze last 5000 events for performance

    if (error || !events) return null;

    const uniqueSessions = new Set(events.map(e => e.session_id)).size;

    const starts = events.filter(e => e.event_type === 'quiz_start').length;
    const completes = events.filter(e => e.event_type === 'quiz_complete').length;

    // Retention per question
    const questionDropoff: Record<number, number> = {};
    events.filter(e => e.event_type === 'quiz_progress').forEach(e => {
        const qId = e.payload?.questionId;
        if (qId) questionDropoff[qId] = (questionDropoff[qId] || 0) + 1;
    });

    const checkouts = events.filter(e => e.event_type === 'click_checkout').length;
    const payments = events.filter(e => e.event_type === 'payment_confirmed').length;

    return {
        totalSessions: uniqueSessions,
        starts,
        completes,
        completionRate: starts ? Math.round((completes / starts) * 100) : 0,
        questionStats: questionDropoff,
        checkouts,
        payments,
        checkoutConversion: completes ? Math.round((checkouts / completes) * 100) : 0
    };
};
