import { useState } from 'react';
import { questions } from '../data/questions';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface Props {
    onFinish: (answers: Record<number, string>) => void;
    onBack: () => void;
}

export default function Quiz({ onFinish, onBack }: Props) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isTransitioning, setIsTransitioning] = useState(false);

    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleOptionSelect = (value: string) => {
        const newAnswers = { ...answers, [question.id]: value };
        setAnswers(newAnswers);

        trackEvent('quiz_progress', { questionId: question.id });

        setIsTransitioning(true);

        setTimeout(() => {
            if (currentQuestionIndex === questions.length - 1) {
                trackEvent('quiz_complete');
                onFinish(newAnswers);
            } else {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsTransitioning(false);
            }
        }, 400); // Wait for animation
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="fixed top-0 left-0 w-full h-2 bg-gray-200 z-50">
                <div
                    className="h-full bg-gradient-to-r from-pink-brand to-pink-deep transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <nav className="p-6 flex justify-between items-center z-40">
                <button
                    onClick={currentQuestionIndex === 0 ? onBack : () => setCurrentQuestionIndex(prev => prev - 1)}
                    className="p-2 -ml-2 text-gray-400 hover:text-gray-800 hover:bg-white rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                    Passo {currentQuestionIndex + 1}/{questions.length}
                </span>
            </nav>

            <main className="flex-1 flex flex-col max-w-xl mx-auto p-6 w-full z-10 justify-center min-h-[80vh]">
                <div
                    className={`transition-all duration-500 ease-in-out transform ${isTransitioning ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}
                >
                    <div className="mb-8">
                        {question.icon && <div className="text-5xl mb-6 filter drop-shadow-lg">{question.icon}</div>}
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {question.text}
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {question.options.map((option, idx) => {
                            const isSelected = answers[question.id] === option.value;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(option.value)}
                                    className={`
                    group relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 overflow-hidden
                    ${isSelected
                                            ? 'border-pink-brand bg-pink-50 ring-2 ring-pink-brand/20 shadow-md transform scale-[1.02]'
                                            : 'border-transparent bg-white shadow-sm hover:border-pink-200 hover:shadow-md hover:scale-[1.01]'}
                  `}
                                >
                                    <div className="relative z-10 flex items-center justify-between">
                                        <span className={`text-lg font-medium transition-colors ${isSelected ? 'text-pink-900' : 'text-gray-700'}`}>
                                            {option.label}
                                        </span>

                                        <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                      ${isSelected ? 'border-pink-brand bg-pink-brand' : 'border-gray-200 group-hover:border-pink-300'}
                    `}>
                                            {isSelected ? (
                                                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-pink-300" />
                                            )}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
