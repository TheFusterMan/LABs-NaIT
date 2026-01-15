function getGCD(a, b) {
    if (b === 0) {
        return a;
    } else {
        return getGCD(b, a % b);
    }
}

function simplify(n, d) {
    let c = getGCD(Math.abs(n), Math.abs(d));
    n /= c;
    d /= c;

    if (d < 0) {
        n = -n;
        d = -d;
    }

    return {
        n: n,
        d: d
    };
}

function getFractionFromInput(prefix) {
    let val = (suffix) => {
        let el = document.getElementById(prefix + suffix);
        let v = el.value.trim();

        el.classList.remove('error');
        if (el.nextElementSibling) {
            el.nextElementSibling.textContent = '';
        }

        if (el.parentElement.classList.contains('hidden')) {
            return 0;
        }

        if (v === '' || isNaN(v) || (suffix === '-d' && +v === 0)) {
            el.classList.add('error');
            return null;
        }

        return parseInt(v);
    };

    let z = val('-z')
    let n = val('-n')
    let d = val('-d');

    if (z === null || n === null || d === null) {
        return null;
    }

    if (d < 0) {
        n = -n;
        d = -d;
    }

    let newNum;

    if (z < 0 && n > 0) {
        newNum = z * d - n;
    } else {
        newNum = z * d + n;
    }

    return {
        n: newNum,
        d: d
    };
}

function drawFraction(frac) {
    let s = simplify(frac.n, frac.d);
    let isNeg = s.n < 0;
    let absN = Math.abs(s.n), absD = Math.abs(s.d);

    let whole = Math.trunc(absN / absD);
    let num = absN % absD;

    if (whole === 0 && num === 0) {
        return '<div class="fraction-item">0</div>';
    }

    let html = '<div class="fraction-item">';

    if (whole !== 0) {
        html += `<span>${isNeg ? -whole : whole}</span>&nbsp;`;
    } else if (isNeg) {
        html += `<span>-&ensp;</span>`;
    }

    if (num !== 0) {
        html += `<div><span>${num}</span><div class="frac-line"></div><span>${absD}</span></div>`;
    }

    return html + '</div>';
}

// ============================ СОБЫТИЯ КНОПОК ===============================

let resultsEl = document.getElementById('results');

function changeVisibility() {
    let isMixed = document.getElementById('fractionType').value === 'mixed';

    document.querySelectorAll('.input-z').forEach(el => {
        if (isMixed) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
            el.querySelector('input').value = '';
        }
    });
}

function clearFields() {
    document.querySelectorAll('input[type="text"]').forEach(el => {
        el.value = '';
        el.classList.remove('error');
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(el => {
        el.checked = false;
    });

    resultsEl.innerHTML = '';
}

function calcResult() {
    resultsEl.innerHTML = '';

    let f1 = getFractionFromInput('f1');
    let f2 = getFractionFromInput('f2');

    if (!f1 || !f2) {
        return;
    }

    let checkboxes = document.getElementsByName('op');

    if (checkboxes.length === 0) {
        resultsEl.innerHTML = '<div class="result-item" style="border-left-color:red">Выберите хотя бы одну операцию!</div>';
        return;
    }

    for (let checkbox of checkboxes) {
        if (!checkbox.checked) {
            continue;
        }

        let op = checkbox.value;
        let res = {
            n: 0,
            d: 1
        };
        let sign = '';
        let error = null;

        if (op === 'sum') {
            res = {
                n: f1.n * f2.d + f2.n * f1.d,
                d: f1.d * f2.d
            };
            sign = '+';
        } else if (op === 'sub') {
            res = {
                n: f1.n * f2.d - f2.n * f1.d, d: f1.d * f2.d
            };
            sign = '-';
        } else if (op === 'div') {
            if (f2.n === 0) {
                error = 'Деление на 0';
            }
            else {
                res = {
                    n: f1.n * f2.d,
                    d: f1.d * f2.n
                };
            }
            sign = '/';
        }

        let row = document.createElement('div');
        row.className = 'result-item';

        let htmlF2 = drawFraction(f2);

        if (f2.n < 0) {
            htmlF2 = `( ${htmlF2} )`;
        }

        let expression = `${drawFraction(f1)} <b> ${sign} </b> ${htmlF2} = `;

        if (error) {
            row.style.borderColor = 'red';
            row.innerHTML = expression + `<span style="color:red">${error}</span>`;
        } else {
            row.innerHTML = expression + `<b>${drawFraction(res)}</b>`;
        }
        resultsEl.appendChild(row);
    }
}