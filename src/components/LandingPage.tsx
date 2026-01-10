import { ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface Props {
    onStart: () => void;
}

export default function LandingPage({ onStart }: Props) {
    const handleStart = () => {
        trackEvent('quiz_start');
        onStart();
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-pink-soft rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vh] h-[40vh] bg-skin-medium rounded-full blur-3xl opacity-30 -z-10" />

            <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 text-center max-w-2xl mx-auto w-full z-10">

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-pink-100 rounded-full mb-8 shadow-sm animate-fade-in">
                    <Star className="w-4 h-4 text-pink-brand fill-pink-brand" />
                    <span className="text-sm font-medium text-pink-900 tracking-wide uppercase">Diagnóstico Gratuito</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-[1.1] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    Descobre o segredo da <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-brand to-pink-deep">
                        tua pele perfeita
                    </span>
                </h1>

                <p className="text-gray-600 mb-10 text-lg md:text-xl leading-relaxed max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    Pare de gastar dinheiro em produtos errados. Em <strong>3 minutos</strong>, entenda o que a sua pele realmente precisa.
                </p>

                <div className="w-full max-w-sm mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <button
                        onClick={handleStart}
                        className="group relative w-full bg-gradient-to-r from-pink-brand to-pink-deep hover:shadow-lg hover:shadow-pink-brand/40 text-white font-bold py-5 px-8 rounded-2xl text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 active:scale-95 overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            Começar Diagnóstico
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <p className="mt-4 text-sm text-gray-500 font-medium">✨ Mais de 1.000 mulheres já fizeram</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    {[
                        "100% Gratuito e Online",
                        "Análise Profissional",
                        "Rotina Personalizada",
                        "Sem termos complicada"
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-4 bg-white/60 backdrop-blur-md border border-white rounded-xl shadow-sm">
                            <div className="bg-green-100 p-1.5 rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="p-6 text-center text-sm text-gray-400">
                &copy; 2026 Skin Diagnosis MZ
            </footer>
        </div>
    );
}
