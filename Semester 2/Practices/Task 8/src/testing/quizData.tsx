export type tTasks = {
    question?: string;
    answer: string;
}[];

export type tQuizType = "M" | "S" | "C";

export type tQuizzes = {
    id: number;
    type: tQuizType;
    title: string;
    tasks: tTasks;
    correctAnswer?: string | string[];
    multiple?: boolean;
}[];

export const quiz: tQuizzes = [
    {
        id: 1,
        type: "M",
        title: "Сопоставьте животное и его класс",
        tasks: [
            { question: "Собака", answer: "Млекопитающие" },
            { question: "Попугай Ара", answer: "Птицы" },
            { question: "Красноглазая квакша", answer: "Земноводные" },
            { question: "Бородатая агама", answer: "Рептилии" }
        ]
    },
    {
        id: 2,
        type: "M",
        title: "Сопоставьте породу и вид питомца",
        tasks: [
            { question: "Мейн-кун", answer: "Кошка" },
            { question: "Вельш-корги", answer: "Собака" },
            { question: "Дамбо", answer: "Крыса" },
            { question: "Гуппи", answer: "Рыбка" }
        ]
    },
    {
        id: 3,
        type: "S",
        title: "Расположите животных по их среднему весу (от самого легкого к самому тяжелому)",
        tasks: [
            { answer: "Хомяк Джунгарский" },
            { answer: "Декоративный кролик" },
            { answer: "Мопс" },
            { answer: "Лев" },
            { answer: "Слон" }
        ]
    },
    {
        id: 4,
        type: "S",
        title: "Расположите группы животных в порядке эволюционного появления (от древних к молодым)",
        tasks: [
            { answer: "Рыбы" },
            { answer: "Земноводные" },
            { answer: "Рептилии" },
            { answer: "Птицы" },
            { answer: "Млекопитающие" }
        ]
    },
    {
        id: 5,
        type: "C",
        title: "Какое из этих животных является сумчатым?",
        multiple: false,
        tasks: [
            { answer: "Лев" },
            { answer: "Сахарный поссум" },
            { answer: "Сирийский хомяк" },
            { answer: "Дегу" }
        ],
        correctAnswer: "Сахарный поссум"
    },
    {
        id: 6,
        type: "C",
        title: "Выберите всех представителей аквариумистики (множественный выбор)",
        multiple: true,
        tasks: [
            { answer: "Креветка Вишня" },
            { answer: "Песчанка" },
            { answer: "Сом Анциструс" },
            { answer: "Эублефар" }
        ],
        correctAnswer: ["Креветка Вишня", "Сом Анциструс"]
    }
];