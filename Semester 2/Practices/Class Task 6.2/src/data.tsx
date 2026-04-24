interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
}

const initialBooks : Book[] = [
    {
        id: 1,
        title: 'Мастер и Маргарита',
        author: 'Булгаков М.А.',
        price: 581.50
    },
    {
        id: 2,
        title: 'Белая гвардия',
        author: 'Булгаков М.А.',
        price: 600.00
    },
    {
        id: 3,
        title: 'Война и мир',
        author: 'Толстой Л.Н.',
        price: 899.99
    },
    {
        id: 4,
        title: 'Анна Каренина',
        author: 'Толстой Л.Н.',
        price: 450.10
    },
    {
        id: 5,
        title: 'Игрок',
        author: 'Достоевский Ф.М.',
        price: 234.55
    }
];

export default initialBooks;