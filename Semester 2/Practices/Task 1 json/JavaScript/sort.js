const changeNextSelect = (curSelectId, nextSelectId) => {
    const curSelect = document.getElementById(curSelectId);
    const nextSelect = document.getElementById(nextSelectId);

    if (!nextSelect) return;

    nextSelect.disabled = true;
    nextSelect.value = "none";

    const nextLevelNum = parseInt(nextSelectId.replace('sort', '')) + 1;
    const futureSelectId = 'sort' + nextLevelNum;
    changeNextSelect(nextSelectId, futureSelectId);

    if (curSelect.value === "none") {
        return;
    }

    nextSelect.disabled = false;
    nextSelect.innerHTML = document.getElementById("sort1").innerHTML;

    let optionToRemove = nextSelect.querySelector(`option[value="${curSelect.value}"]`);
    if (optionToRemove) optionToRemove.remove();

    if (curSelectId === "sort2") {
        const sort1Value = document.getElementById("sort1").value;
        let optionFromLevel1 = nextSelect.querySelector(`option[value="${sort1Value}"]`);
        if (optionFromLevel1) optionFromLevel1.remove();
    }
};

const createSortArr = (sortForm) => {
    const selects = Array.from(sortForm.querySelectorAll('select'));
    return selects.map(select => ({
        key: select.value,
        isDesc: document.getElementById(select.id + '_desc').checked,
        disabled: select.disabled
    })).filter(item => item.key !== "none" && !item.disabled);
};


const getSortedData = (data, sortForm) => {
    const sortArr = createSortArr(sortForm);

    if (sortArr.length === 0) {
        return data; 
    }

    
    return [...data].sort((a, b) => {
        for (let level of sortArr) {
            const valA = a[level.key];
            const valB = b[level.key];
            let comp = 0;

            
            if (typeof valA === "number" && typeof valB === "number") {
                comp = valA - valB;
            } else {
                comp = String(valA).localeCompare(String(valB));
            }

            if (comp !== 0) {
                return level.isDesc ? -comp : comp;
            }
        }
        return 0;
    });
};

const resetSortSelects = () => {
    document.getElementById("sort1").value = "none";
    document.getElementById("sort1_desc").checked = false;
    document.getElementById("sort2").disabled = true;
    document.getElementById("sort2").innerHTML = '<option value="none">Нет</option>';
    document.getElementById("sort3").disabled = true;
    document.getElementById("sort3").innerHTML = '<option value="none">Нет</option>';
};