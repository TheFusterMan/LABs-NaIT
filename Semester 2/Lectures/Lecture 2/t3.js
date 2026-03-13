document.addEventListener("DOMContentLoaded", () => {
    const text = d3.select("ol li").text();

    d3.selectAll("ol")
        .append("li")
        .text(text);
});