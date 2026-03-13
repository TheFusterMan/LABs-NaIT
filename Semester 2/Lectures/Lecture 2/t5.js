document.addEventListener("DOMContentLoaded", function() {
    let books = [
        {title : 'Мастер и Маргарита',
            author: 'Булгаков М.А.',
            price: 581.50},
        {title : 'Белая гвардия',
            author: 'Булгаков М.А.',
            price: 600.00},
        {title : 'Война и мир',
            author: 'Толстой Л.Н.',
            price: 899.99},
        {title : 'Анна Каренина',
            author: 'Толстой Л.Н.',
            price: 450.10},
        {title : 'Игрок',
            author: 'Достоевский Ф.М.',
            price: 234.55}
    ];

    let rows = d3.select("table")
        .select("tbody")
        .selectAll("tr")
        .data(books)
        .enter()
        .append("tr");

    rows.selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);

    let compareByPrice = (a, b) => (a.price <= b.price) ? -1 : 1;

    let compareByAuthor = (a, b) => {
        switch (a.author.localeCompare(b.author)) {
            case -1:
                return -1;
            case 0:
                return compareByPrice(a, b);
            case 1:
                return 1;
        }
    }

    d3.select("table")
        .select("tbody")
        .selectAll("tr")
        .sort(compareByAuthor);
});