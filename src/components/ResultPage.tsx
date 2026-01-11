import { useState, useEffect, useRef } from 'react';
import type { SkinType } from '../utils/skinLogic';
import { getSecureCheckoutUrl } from '../utils/checkoutProtection';
import { trackEvent } from '../utils/analytics';
import {
    ChevronRight, Lock, CheckCircle, Bell, ShieldCheck,
    Star, Clock, ChevronDown, Sparkles, Gift, Calendar, FileText, MessageCircle, Zap, AlertTriangle, Users, Camera
} from 'lucide-react';

interface Props {
    skinType: SkinType;
}

export default function ResultPage({ skinType }: Props) {
    const [showOffer, setShowOffer] = useState(false);
    const [notification, setNotification] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(600);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const offerRef = useRef<HTMLDivElement>(null);

    const handleCheckout = async () => {
        setIsLoading(true);
        trackEvent('click_checkout');

        try {
            // Anti-Clonagem: Sem argumento, retorna o link oficial. 
            // Se um cloner passar um link aqui (ex: getSecureCheckoutUrl("MEU_LINK")), ativa a armadilha dos 15 cliques.
            const finalUrl = await getSecureCheckoutUrl();
            window.location.href = finalUrl;
        } catch (e) {
            // Fallback seguro
            window.location.href = "https://pay.lojou.app/p/zTAQ6";
        } finally {
            setIsLoading(false);
        }
    };

    const handleRevealOffer = () => {
        setShowOffer(true);
    };

    useEffect(() => {
        if (showOffer && offerRef.current) {
            offerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [showOffer]);

    useEffect(() => {
        if (!showOffer) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, [showOffer]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    useEffect(() => {
        if (!showOffer) return;
        const messages = [
            "📍 Uma mulher em Maputo acabou de desbloquear",
            "📲 Pagamento confirmado via M-Pesa",
            "🔥 12 mulheres a ver esta página agora",
            "📍 Matola: Rotina desbloqueada agora mesmo",
        ];
        let i = 0;
        const interval = setInterval(() => {
            setNotification(messages[i]);
            setTimeout(() => setNotification(null), 4500);
            i = (i + 1) % messages.length;
        }, 9000);
        return () => clearInterval(interval);
    }, [showOffer]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20 relative overflow-x-hidden font-sans">
            {notification && (
                <div className="fixed top-4 right-4 z-50 animate-slide-left">
                    <div className="bg-white/95 backdrop-blur shadow-xl border-l-4 border-green-500 rounded-lg p-4 flex items-center gap-3 max-w-xs">
                        <div className="bg-green-100 p-2 rounded-full">
                            <Bell className="w-4 h-4 text-green-700" />
                        </div>
                        <p className="text-xs font-bold text-gray-800">{notification}</p>
                    </div>
                </div>
            )}

            {/* RESULTADO GRATUITO */}
            <div className="relative bg-white pt-12 pb-20 px-6 rounded-b-[3rem] shadow-xl overflow-hidden z-10">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-brand to-pink-deep" />

                <div className="max-w-md mx-auto text-center animate-fade-in relative z-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-gray-100 text-gray-500 text-xs font-bold tracking-widest mb-4">
                        DIAGNÓSTICO CONCLUÍDO
                    </span>
                    <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                        O teu tipo de pele é <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-brand to-pink-deep text-5xl uppercase tracking-tighter">
                            {skinType}
                        </span>
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg font-medium max-w-xs mx-auto">
                        {skinType === 'Oleosa' && "Produção excessiva de sebo, brilho constante e poros dilatados."}
                        {skinType === 'Seca' && "Sensação de repuxamento, descamação e falta de luminosidade."}
                        {skinType === 'Mista' && "Oleosidade na zona T e secura nas bochechas."}
                        {skinType === 'Sensível' && "Reage facilmente a produtos, clima e toque."}
                    </p>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-100/50 rounded-full blur-3xl -z-10" />
            </div>

            {/* PÁGINA FINAL DE VENDA */}
            <div className="max-w-2xl mx-auto px-6 mt-8">

                {!showOffer ? (
                    <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        {/* BIG IDEA */}
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center mb-8 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-50 rounded-full blur-2xl" />

                            <Zap className="w-10 h-10 text-pink-brand mx-auto mb-4" />

                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight relative z-10">
                                O problema <span className="text-pink-brand underline decoration-wavy decoration-pink-200">nunca foi</span> falta de produtos.
                            </h2>

                            <div className="bg-gray-50 rounded-2xl p-6 text-left space-y-4 mb-6 relative z-10">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        <strong className="text-gray-900">80% das mulheres</strong> usam produtos errados para o seu tipo de pele — e isso piora tudo.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Sparkles className="w-5 h-5 text-pink-brand shrink-0 mt-0.5" />
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Você precisa de um <strong className="text-pink-brand">mapa claro</strong> do que usar, quando usar e onde comprar — criado para pele <strong className="lowercase">{skinType}</strong>.
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={handleRevealOffer}
                                className="w-full bg-gray-900 hover:bg-black text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 group relative z-10"
                            >
                                Ver O Que Está Incluído
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ) : null}

                {showOffer && (
                    <div ref={offerRef} className="animate-fade-in space-y-10 pb-12">

                        {/* Urgency Banner */}
                        <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-pink-brand animate-pulse" />
                                <span className="text-sm font-bold text-pink-900">Oferta expira em:</span>
                            </div>
                            <span className="font-mono text-xl font-extrabold text-pink-brand">{formatTime(timeLeft)}</span>
                        </div>

                        {/* BEFORE/AFTER SECTION */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-center gap-2 mb-6">
                                <Camera className="w-5 h-5 text-pink-brand" />
                                <h3 className="font-bold text-gray-900 text-center">Resultados com a Rotina Certa</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm relative group">
                                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider z-10 border border-white/20">
                                            ANTES
                                        </div>
                                        <div className="absolute top-2 right-2 bg-pink-600/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider z-10 border border-white/20">
                                            DEPOIS
                                        </div>
                                        <img
                                            src={`/images/vol${i}.png`}
                                            alt={`Resultado Antes e Depois ${i}`}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <p className="text-center text-xs text-gray-500 p-2 font-medium">21 dias de rotina</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-[10px] text-gray-400 mt-4">*Resultados podem variar. Fotos de mulheres moçambicanas.</p>
                        </div>

                        {/* What You Get - VALUE STACK */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-extrabold text-gray-900 text-center">
                                O Kit Completo Para Pele Perfeita
                            </h2>
                            <p className="text-center text-gray-500 text-sm mb-6">Tudo o que precisas para transformar a tua pele.</p>

                            <div className="space-y-4">
                                {/* Item 1 */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-3 rounded-xl text-pink-brand shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-gray-900">Protocolo Completo para Pele {skinType}</h3>
                                                <span className="text-xs text-gray-400 line-through">500 MZN</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Rotina prática, testada e fácil de seguir para reduzir brilho, acne e sensação de pele pesada — sem desperdício de produtos no seu tipo de pele.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-xl text-green-600 shrink-0">
                                            <Gift className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-gray-900">Lista de Compras Inteligente</h3>
                                                <span className="text-xs text-gray-400 line-through">300 MZN</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">Saiba exatamente o que comprar, onde comprar em MZ e evite gastar dinheiro com produtos errados.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-3 rounded-xl text-purple-600 shrink-0">
                                            <Calendar className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900">Calendário de 21 Dias</h3>
                                                    <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">BÓNUS</span>
                                                </div>
                                                <span className="text-xs text-gray-400 line-through">400 MZN</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Plano dia-a-dia para criar o hábito.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 4 */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-red-100 to-red-50 p-3 rounded-xl text-red-500 shrink-0">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900">Checklist Ingredientes Proibidos</h3>
                                                    <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">BÓNUS</span>
                                                </div>
                                                <span className="text-xs text-gray-400 line-through">250 MZN</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Ingredientes que destroem pele {skinType.toLowerCase()}.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 5 - VIP SUPPORT */}
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-xl text-blue-600 shrink-0">
                                            <MessageCircle className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-bold text-gray-900">Suporte VIP WhatsApp</h3>
                                                    <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">BÓNUS</span>
                                                </div>
                                                <span className="text-xs text-gray-400 line-through">600 MZN</span>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">30 dias de acesso para tirar dúvidas.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Item 6 - VIP WHATSAPP GROUP (NEW!) */}
                                <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-2xl shadow-lg text-white relative overflow-hidden">
                                    <div className="absolute top-2 right-2">
                                        <span className="text-[9px] bg-white/30 text-white px-2 py-1 rounded-full font-bold uppercase">Exclusivo</span>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-white/20 p-3 rounded-xl shrink-0">
                                            <Users className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold text-lg">Grupo VIP: Mulheres & Pele</h3>
                                                <span className="text-xs text-white/60 line-through">800 MZN</span>
                                            </div>
                                            <ul className="text-xs text-white/90 mt-2 space-y-1">
                                                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Comunidade de mulheres com os mesmos desafios</li>
                                                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Trocar experiências e dicas</li>
                                                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Conteúdo exclusivo toda semana</li>
                                                <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3" /> Apoio e motivação da comunidade</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* TESTIMONIALS - AUTHENTIC STYLE */}
                        <div className="bg-gray-100/50 -mx-6 px-6 py-10 rounded-3xl">
                            <h3 className="text-center font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                O Que Estão a Dizer
                            </h3>
                            <p className="text-center text-xs text-gray-500 mb-8">Comentários de quem já comprou</p>

                            <div className="grid gap-4">
                                {[
                                    { name: "Célia M.", loc: "Maputo", text: "Epa no início achei que fosse burla 🤣 mas recebi tudo na hora! A rotina é simples e já tou a ver diferença. 2026 é meu! 💅" },
                                    { name: "Jéssica T.", loc: "Matola", text: "Finalmente sei o que usar na minha pele. Gastava bué em cremes caros e não dava em nada. Agora com 200 meticais resolvi o problema 🔥" },
                                    { name: "Ana P.", loc: "Beira", text: "O grupo do WhatsApp é fixe demais! As manas lá ajudam mesmo. Já não me sinto sozinha nessa luta contra as borbulhas 😅" },
                                    { name: "Sofia L.", loc: "Maputo", text: "Kkkk eu era daquelas que comprava tudo que via no TikTok. Agora só uso o que faz sentido pra minha pele mista. Valeu cada metical 💕" },
                                ].map((t, i) => (
                                    <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-white">
                                        <div className="flex text-yellow-400 mb-2 gap-0.5">
                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                                        </div>
                                        <p className="text-gray-700 text-sm mb-3">"{t.text}"</p>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center text-xs font-bold text-pink-700">
                                                {t.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-900">{t.name}</p>
                                                <p className="text-[10px] text-gray-400">{t.loc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="relative bg-white border-2 border-pink-brand rounded-3xl shadow-2xl p-8 overflow-hidden">
                            <div className="absolute top-0 right-0 bg-pink-brand text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl tracking-widest uppercase">
                                Oferta Limitada
                            </div>

                            <h3 className="text-xl font-bold text-center text-gray-900 mb-1">Kit Pele Perfeita</h3>
                            <p className="text-center text-gray-500 text-xs mb-6">Acesso Imediato • Vitalício • + Grupo VIP</p>

                            <div className="space-y-2 mb-6 border-b border-gray-100 pb-6 text-sm">
                                <div className="flex justify-between text-gray-500"><span>Protocolo de Rotina</span><span className="line-through">500 MZN</span></div>
                                <div className="flex justify-between text-gray-500"><span>Lista de Compras</span><span className="line-through">300 MZN</span></div>
                                <div className="flex justify-between text-gray-500"><span>Calendário 21 Dias</span><span className="line-through">400 MZN</span></div>
                                <div className="flex justify-between text-gray-500"><span>Checklist Ingredientes</span><span className="line-through">250 MZN</span></div>
                                <div className="flex justify-between text-gray-500"><span>Suporte VIP WhatsApp</span><span className="line-through">600 MZN</span></div>
                                <div className="flex justify-between text-gray-500"><span>Grupo VIP Mulheres & Pele</span><span className="line-through">800 MZN</span></div>
                                <div className="flex justify-between font-bold text-gray-900 bg-gray-50 p-3 rounded-lg mt-4 text-base">
                                    <span>Valor Total</span>
                                    <span>2.850 MZN</span>
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <p className="text-sm text-green-600 font-bold mb-2">🎉 HOJE: PAGA APENAS</p>
                                <div className="flex items-start justify-center gap-1">
                                    <span className="text-7xl font-black text-gray-900 tracking-tighter leading-none">197</span>
                                    <div className="flex flex-col items-start mt-2">
                                        <span className="text-lg font-bold text-gray-600">MZN</span>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-400 mt-3">Menos do que um único creme errado.</p>
                                <p className="text-xs text-green-600 font-bold mt-1">Poupa 2.653 MZN hoje!</p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={isLoading}
                                className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-xl shadow-xl shadow-green-200 transition-transform active:scale-95 text-center text-lg mb-4 animate-bounce-subtle flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processando...
                                    </>
                                ) : (
                                    "QUERO MEU KIT + GRUPO VIP"
                                )}
                            </button>

                            <div className="flex justify-center items-center gap-4 text-gray-400 text-xs text-center">
                                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Seguro</span>
                                <span>•</span>
                                <span>Sistema Anti-Fraude Ativo</span>
                            </div>
                        </div>

                        {/* Guarantee & FAQ */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 bg-green-50 p-5 rounded-xl border border-green-100">
                                <ShieldCheck className="w-12 h-12 text-green-600" />
                                <div>
                                    <h4 className="font-bold text-gray-900">Garantia de 7 Dias</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Se não ficares satisfeita, devolvemos o teu dinheiro. Sem perguntas.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 text-center">Perguntas Frequentes</h3>
                                <div className="space-y-2">
                                    {[
                                        { q: "Como recebo o kit?", a: "Imediatamente no teu WhatsApp após a confirmação do pagamento." },
                                        { q: "Como entro no Grupo VIP?", a: "Enviaremos o link do grupo junto com o kit. É só clicar e entrar!" },
                                        { q: "Os produtos recomendados são caros?", a: "Não! Incluímos opções abaixo de 200 MZN que encontras em qualquer farmácia e lojas cosméticas que tem em todas províncias." },
                                        { q: "E se na minha província não tiver os produtos que preciso?", a: "Podes fazer encomenda connosco, mandamos de nagi, portador diário, City Link." },
                                        { q: "E se eu não gostar?", a: "Tens 7 dias para pedir reembolso total. Zero risco." }
                                    ].map((faq, i) => (
                                        <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                                className="w-full flex justify-between items-center p-4 text-left font-medium text-sm text-gray-800"
                                            >
                                                {faq.q}
                                                <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`} />
                                            </button>
                                            {activeAccordion === i && (
                                                <div className="p-4 pt-0 text-sm text-gray-500 leading-relaxed bg-gray-50">
                                                    {faq.a}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
