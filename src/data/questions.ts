export type Answer = string;

export interface Question {
    id: number;
    text: string;
    icon?: string; // Optional icon emoji
    options: {
        label: string;
        value: string; // Internal value for logic
    }[];
}

export const questions: Question[] = [
    {
        id: 1,
        text: "Ao longo do dia, a tua pele costuma:",
        icon: "🧴",
        options: [
            { label: "Ficar muito oleosa e a brilhar", value: "oily" },
            { label: "Ficar normal", value: "normal" },
            { label: "Ficar seca ou a repuxar", value: "dry" },
            { label: "Ficar oleosa só na testa e no nariz", value: "mixed" },
        ],
    },
    {
        id: 2,
        text: "Depois de lavares o rosto (com água ou sabão), a tua pele:",
        icon: "🚿",
        options: [
            { label: "Fica confortável", value: "normal" },
            { label: "Fica oleosa rapidamente", value: "oily" },
            { label: "Fica seca e repuxa", value: "dry" },
            { label: "Arde ou fica vermelha", value: "sensitive" },
        ],
    },
    {
        id: 3,
        text: "Com que frequência tens espinhas ou borbulhas?",
        icon: "😖",
        options: [
            { label: "Quase sempre", value: "acne" },
            { label: "Às vezes", value: "mixed" },
            { label: "Raramente", value: "normal" },
            { label: "Quase nunca", value: "dry" },
        ],
    },
    {
        id: 4,
        text: "A tua pele costuma:",
        icon: "🔥",
        options: [
            { label: "Arder ou coçar com alguns produtos", value: "sensitive_high" },
            { label: "Ficar vermelha facilmente", value: "sensitive" },
            { label: "Não reagir quase nunca", value: "resilient" },
        ],
    },
    {
        id: 5,
        text: "Quando estás muito tempo ao sol, a tua pele:",
        icon: "🌞",
        options: [
            { label: "Fica muito oleosa", value: "oily" },
            { label: "Fica normal", value: "normal" },
            { label: "Fica seca ou sensível", value: "dry_sensitive" },
            { label: "Mancha com facilidade", value: "spots" },
        ],
    },
    {
        id: 6,
        text: "Usas maquilhagem?",
        icon: "💄",
        options: [
            { label: "Sim, quase todos os dias", value: "daily" },
            { label: "Às vezes", value: "sometimes" },
            { label: "Raramente", value: "rarely" },
            { label: "Não uso maquilhagem", value: "never" },
        ],
    },
    {
        id: 7,
        text: "Ao acordar de manhã, a tua pele costuma:",
        icon: "💦",
        options: [
            { label: "Estar oleosa", value: "oily" },
            { label: "Estar normal", value: "normal" },
            { label: "Estar seca", value: "dry" },
            { label: "Estar irritada ou sensível", value: "sensitive" },
        ],
    },
    {
        id: 8,
        text: "Quantas vezes lavas o rosto por dia?",
        icon: "🧼",
        options: [
            { label: "1 vez", value: "1x" },
            { label: "2 vezes", value: "2x" },
            { label: "Mais de 2 vezes", value: "3x" },
            { label: "Quase não lavo", value: "0x" },
        ],
    },
    {
        id: 9,
        text: "Em dias de calor ou humidade, a tua pele:",
        icon: "🌬️",
        options: [
            { label: "Fica muito oleosa", value: "oily" },
            { label: "Fica normal", value: "normal" },
            { label: "Fica desconfortável", value: "sensitive" },
            { label: "Dá mais borbulhas", value: "acne" },
        ],
    },
    {
        id: 10,
        text: "Qual dessas situações mais te incomoda hoje?",
        icon: "🪞",
        options: [
            { label: "Oleosidade excessiva", value: "oily" },
            { label: "Borbulhas / espinhas", value: "acne" },
            { label: "Pele seca ou a repuxar", value: "dry" },
            { label: "Manchas", value: "spots" },
            { label: "Sensibilidade", value: "sensitive" },
        ],
    },
];
