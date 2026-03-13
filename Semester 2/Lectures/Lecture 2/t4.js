document.addEventListener("DOMContentLoaded", function() {
    const values = d3.selectAll("li").nodes()
        .map(node => node.textContent);

    const ul = d3.select("body").append("ul");

    ul
        .selectAll("li")
        .data(values)
        .enter()
        .append("li")
        .text(d => d);
});