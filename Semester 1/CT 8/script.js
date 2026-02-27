function changePage(elementId) {
    let element = document.getElementById(elementId);

    if (element) {
        let targets = element.querySelectorAll("div, ul, ol");

        targets.forEach(element => {
            let q = element.children.length;

            if (q > 0 && q < 3) {
                let fc = element.children[0];

                for (let i = 0; i < 3 - q; i++) {
                    let newEl = fc.cloneNode(true);
                    element.appendChild(newEl);
                }
            } else if (q === 0) {
                for (let i = 0; i < 3; i++) {
                    let newP = document.createElement("p");
                    newP.textContent = "Новый элемент";
                    element.appendChild(newP);
                }
            }
        });
    }
}