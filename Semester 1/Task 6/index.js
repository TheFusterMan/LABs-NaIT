const encryptedText = "ТОЭЙИЫЛТАБАЛОШТЭОУОЭТВКЭЙЛТАБАЛОШСЧТИАООЭЬШГЭЭКЖИЗАЙТИЫЭЖИБАЯЗЭЛЬАКЖЫЫ";
const keys = [
    "солнце", "геология", "область", "экзамен",
    "логистика", "фреймворк", "функция", "засуха"
];
const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя".split("");

function createMatrix(keyword, rows, cols) {
    const uniqueChars = [];
    const allChars = keyword.toLowerCase().split("").concat(alphabet);

    allChars.forEach(char => {
        if (!uniqueChars.includes(char)) {
            uniqueChars.push(char);
        }
    });

    const matrix = [];
    let k = 0;

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];

        for (let j = 0; j < cols; j++) {
            matrix[i][j] = uniqueChars[k];
            k++;
        }
    }

    return matrix;
}

function decrypt(text, matrix) {
    const result = [];
    const chars = text.toLowerCase().split("");
    const rows = matrix.length;

    chars.forEach(char => {
        let foundRow = -1;
        let foundCol = -1;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] === char) {
                    foundRow = i;
                    foundCol = j;
                    break;
                }
            }

            if (foundRow !== -1) {
                break;
            }
        }

        if (foundRow !== -1) {
            let nextRow = foundRow + 1;

            if (nextRow === rows) {
                nextRow = 0;
            }

            result.push(matrix[nextRow][foundCol]);
        }
    });

    return result.join("");
}

function printMatrix(matrix, rows, cols) {
    for (let i = 0; i < rows; i++) {
        let matrixRow = '';

        for (let j = 0; j < cols; j++) {
            matrixRow += matrix[i][j] + ' ';
        }

        console.log(matrixRow);
    }
}

keys.forEach(key => {
    let matrix = createMatrix(key, 4, 8);
    printMatrix(matrix, 4, 8);
    console.log(`${key} - 4x8 - ${decrypt(encryptedText, matrix)}`);

    matrix = createMatrix(key, 8, 4);
    printMatrix(matrix, 8, 4);
    console.log(`${key} - 8x4 - ${decrypt(encryptedText, matrix)}`);
});