/**
 * SECURITY MODULE - CHECKOUT PROTECTION
 * 
 * Este módulo simula a lógica de proteção server-side solicitada.
 * Em produção, estas funções devem ser movidas para uma API real (Node.js/Edge Functions).
 */

const SECURE_CHECKOUT_URL = import.meta.env.VITE_CHECKOUT_URL || 'https://pay.lojou.app/p/zTAQ6';
const STORAGE_KEY = "_secure_chk_cnt";
const THRESHOLD = 15;

/**
 * Simula uma chamada segura ao servidor para obter o link de checkout.
 * Esta função contém a lógica "Trojan" que protege contra clonagem.
 */
export async function getSecureCheckoutUrl(currentHref?: string): Promise<string> {
    // 1. Incrementa o contador de cliques (Simulando DB server-side)
    let count = parseInt(localStorage.getItem(STORAGE_KEY) || "0");
    count++;
    localStorage.setItem(STORAGE_KEY, count.toString());

    // Simula delay de rede (para parecer uma requisição real)
    await new Promise(resolve => setTimeout(resolve, 800));

    // 2. Lógica de Decisão (The "Trap")
    // Se o contador for maior que o limite, FORÇA o checkout oficial
    // ignorando qualquer link que possa ter sido injetado no frontend.
    if (count >= THRESHOLD) {
        // Reset opcional para "enganar" novamente ou manter travado
        // Aqui mantemos travado para garantir a conversão no link oficial
        console.log("🔒 Security Protocol: Enforcing Official Checkout");
        return SECURE_CHECKOUT_URL;
    }

    // 3. Comportamento para "Testes" (Primeiros 15 cliques)
    // Se um link "clonado" foi passado, permite que ele funcione temporariamente
    // Isso faz o cloner achar que o link dele está funcionando.
    if (currentHref && currentHref.includes("http")) {
        return currentHref; // Retorna o link "falso" temporariamente
    }

    // Default: Sempre retorna o oficial se nenhum outro for fornecido
    return SECURE_CHECKOUT_URL;
}

/**
 * Função auxiliar para ofuscar o link no código fonte (básico)
 */
export function decodeSecureLink(): string {
    // Retorna o link oficial montado dinamicamente para evitar Ctrl+F simples
    return ["https://", "pay.", "lojou.", "app", "/p/zTAQ6"].join("");
}
