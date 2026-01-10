export type SkinType = 'Oleosa' | 'Seca' | 'Mista' | 'Sensível';

export function calculateSkinType(answers: Record<number, string>): SkinType {
    const scores = {
        oily: 0,
        dry: 0,
        mixed: 0,
        sensitive: 0
    };

    // Map every possible answer value to a specific skin type bucket
    // Logic: +1 point to the corresponding type
    const valueMap: Record<string, keyof typeof scores> = {
        // Direct mappings
        'oily': 'oily',
        'dry': 'dry',
        'mixed': 'mixed',
        'sensitive': 'sensitive',

        // Derived mappings
        'normal': 'mixed',        // "Normal" falls under Mixed (balanced)
        'acne': 'oily',           // Acne is predominately associated with Oily skin
        'sensitive_high': 'sensitive',
        'dry_sensitive': 'sensitive', // Prioritize the sensitivity aspect
        'spots': 'sensitive',     // Hyperpigmentation/Sun damage -> Treat as Sensitive/Protection focus
        'resilient': 'mixed',

        // Makeup habits (Inferential)
        'daily': 'oily',          // Heavy usage often correlates with clogging/oil control needs
        'sometimes': 'mixed',
        'rarely': 'dry',
        'never': 'sensitive',     // Often avoid due to reaction

        // Washing habits
        '3x': 'oily',             // Excessive washing implies trying to remove oil
        '2x': 'mixed',            // Standard
        '1x': 'dry',              // Avoids stripping
        '0x': 'dry'
    };

    Object.values(answers).forEach((value) => {
        const type = valueMap[value];
        if (type) {
            scores[type] += 1;
        }
    });

    // Special weighting for Q10 (Main Concern) - User implied main concern is critical
    // "Este ponto é crítico: cada resposta influencia o resultado final."
    // We strictly stick to +1 as requested for general logic, but logically main concern IS the tiebreaker.
    // However, user said "cada resposta adiciona +1". I will treat Q10 as a normal +1 unless a tiebreaker is needed.
    // Actually, to be safe and "accurate", Q10 should probably break ties.
    // Let's implement simple max sort.

    return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0] === 'oily' ? 'Oleosa' :
        Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0] === 'dry' ? 'Seca' :
            Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0] === 'sensitive' ? 'Sensível' : 'Mista';
}
