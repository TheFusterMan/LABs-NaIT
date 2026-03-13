document.addEventListener("DOMContentLoaded", function() {
    const lis = d3.selectAll("ul.list li").nodes();
    const allText = lis.map(item => item.textContent);
    const uniqueText = allText.filter((text, index) => allText.indexOf(text) === index);

    console.log(uniqueText);
});