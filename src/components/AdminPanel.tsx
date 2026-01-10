import { useState, useEffect } from 'react';
import { getMetrics } from '../utils/analytics';
import { Lock, BarChart2, Users, ShoppingCart, RefreshCcw } from 'lucide-react';

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [metrics, setMetrics] = useState<any>(null);

    useEffect(() => {
        if (isAuthenticated) {
            const fetchMetrics = async () => {
                const data = await getMetrics();
                setMetrics(data);
            };
            fetchMetrics();
            const interval = setInterval(fetchMetrics, 5000);
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Senha incorreta');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <div className="bg-pink-100 p-4 rounded-full">
                            <Lock className="w-8 h-8 text-pink-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Acesso</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha de acesso"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none mb-4"
                    />
                    <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-black transition">
                        Entrar
                    </button>
                    <p className="text-center text-xs text-gray-400 mt-4">Somente pessoal autorizado</p>
                </form>
            </div>
        );
    }

    if (!metrics) return <div>Carregando...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Vendas</h1>
                        <p className="text-gray-500">Monitoramento em tempo real do quiz</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="p-2 bg-white rounded-lg shadow text-gray-600 hover:text-pink-600">
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>

                {/* OVERVIEW CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Users className="w-5 h-5" /></div>
                            <span className="text-sm font-bold text-gray-500">Iniciaram</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{metrics.starts}</p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-purple-100 p-3 rounded-xl text-purple-600"><BarChart2 className="w-5 h-5" /></div>
                            <span className="text-sm font-bold text-gray-500">Finalizaram</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{metrics.completes}</p>
                        <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">{metrics.completionRate}% Conv.</span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-green-100 p-3 rounded-xl text-green-600"><ShoppingCart className="w-5 h-5" /></div>
                            <span className="text-sm font-bold text-gray-500">Cliques Checkout</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{metrics.checkouts}</p>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{metrics.checkoutConversion}% do Quiz</span>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600"><Users className="w-5 h-5" /></div>
                            <span className="text-sm font-bold text-gray-500">Total Sessões</span>
                        </div>
                        <p className="text-3xl font-black text-gray-900">{metrics.totalSessions}</p>
                    </div>
                </div>

                {/* DETAILED STATS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Retention Table */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-6">Retenção por Pergunta</h3>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => {
                                const count = metrics.questionStats[q] || 0;
                                const prevCount = q === 1 ? metrics.starts : (metrics.questionStats[q - 1] || count); // fallback
                                const dropoff = prevCount > 0 ? Math.round(((prevCount - count) / prevCount) * 100) : 0;
                                const percentage = metrics.starts > 0 ? Math.round((count / metrics.starts) * 100) : 0;

                                return (
                                    <div key={q} className="flex items-center gap-4">
                                        <span className="w-8 font-mono text-xs font-bold text-gray-400">Q{q}</span>
                                        <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-pink-brand rounded-full transition-all"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                        <div className="text-right w-24">
                                            <span className="text-sm font-bold text-gray-900">{count}</span>
                                            <span className="text-xs text-gray-400 ml-2">({percentage}%)</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Funnel Summary */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-6">Funil de Vendas</h3>
                        <div className="relative space-y-2">
                            <div className="p-4 bg-gray-50 rounded-xl relative z-30 border border-gray-200">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Passo 1</span>
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-gray-900">Iniciou Quiz</span>
                                    <span className="font-bold text-xl">{metrics.starts}</span>
                                </div>
                            </div>

                            <div className="mx-auto w-0.5 h-4 bg-gray-300"></div>

                            <div className="p-4 bg-purple-50 rounded-xl relative z-20 border border-purple-100">
                                <span className="text-xs font-bold text-purple-500 uppercase tracking-wider">Passo 2</span>
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-purple-900">Viu Resultado</span>
                                    <span className="font-bold text-xl text-purple-900">{metrics.completes}</span>
                                </div>
                            </div>

                            <div className="mx-auto w-0.5 h-4 bg-gray-300"></div>

                            <div className="p-4 bg-green-50 rounded-xl relative z-10 border border-green-100">
                                <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Passo 3</span>
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-green-900">Clicou Comprar</span>
                                    <span className="font-bold text-xl text-green-900">{metrics.checkouts}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
