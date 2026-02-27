
let currentFilteredData = []; 

document.addEventListener("DOMContentLoaded", () => {
    
    currentFilteredData = [...animalsData];
    renderTable(currentFilteredData, "tableBody");
    
    document.getElementById("sort2").disabled = true;
    document.getElementById("sort3").disabled = true;
     
    document.getElementById("findBtn").addEventListener("click", () => {
        const criteria = getFilterCriteria();
        currentFilteredData = filterData(animalsData, criteria);

        
        resetSortSelects();
        renderTable(currentFilteredData, "tableBody");
    });

    
    document.getElementById("resetFilterBtn").addEventListener("click", () => {
        document.getElementById("filterForm").reset();
        resetSortSelects();
        currentFilteredData = [...animalsData]; 
        renderTable(currentFilteredData, "tableBody");
    });

    
    document.getElementById("sort1").addEventListener("change", () => changeNextSelect("sort1", "sort2"));
    document.getElementById("sort2").addEventListener("change", () => changeNextSelect("sort2", "sort3"));

    
    document.getElementById("sortBtn").addEventListener("click", () => {
        const sortForm = document.getElementById("sortBtn").parentElement;
        
        const sortedData = getSortedData(currentFilteredData, sortForm);
        renderTable(sortedData, "tableBody");
    });

    
    const resetSortBtn = document.getElementById("resetSortBtn");
    if (resetSortBtn) {
        resetSortBtn.addEventListener("click", () => {
            resetSortSelects();
            
            renderTable(currentFilteredData, "tableBody");
        });
    }
});