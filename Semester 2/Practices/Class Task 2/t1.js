document.addEventListener("DOMContentLoaded", function() {
    const list = [
        {
            author: "Пушкин А.С.",
            book: ["Стихи и поэмы", "Дубровский", "Евгений Онегин"]
        },
        {
            author: "Булгаков М.А.",
            book: ["Мастер и Маргарита", "Белая гвардия"]
        },
        {
            author: "Достоевский Ф.М.",
            book: ["Игрок", "Идиот", "Преступление и наказание"]
        }
    ];

    const ols = d3.select("body")
        .append("ol")
        .selectAll("li")
        .data(list)
        .enter()
        .append("li")
        .text(d => d.author)

    const uls = ols.append("ul")

    uls.selectAll("li")
        .data(d => d.book)
        .enter()
        .append("li")
        .text(d => d)
});