
const renderTable = (data, tableBodyId = "tableBody") => {
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = ""; 

    if (data.length === 0) {
        
        return;
    }

    data.forEach(item => {
        const tr = document.createElement("tr");

        
        const keys = ["name", "cat", "breed", "qty", "price", "status"];

        keys.forEach(key => {
            const td = document.createElement("td");
            td.textContent = item[key];
            tr.append(td);
        });

        tableBody.append(tr);
    });
};