class Plane {
    // Задание 1
    static TYPE = 'Стандартный самолет';
    #cruiseSpeed;
    DEFAULT_ALLOWED_HEIGHT = 10000;
    static #MIN_ALLOWED_HEIGHT = 0;
    static #MAX_ALLOWED_HEIGHT = 20000;
    static #instances = 0;
    static #MAX_INSTANCES = 10;
    #maxHeightValue;

    // Задание 3
    static #MIN_SPEED = 150;
    static #MAX_SPEED = 3500;

    // Задание 4
    static #speedCounts = {};

    constructor(cruiseSpeed, maxHeight, enginesCount, type) {
        // Задание 1
        if (Plane.#instances >= Plane.#MAX_INSTANCES) {
            throw new Error('Превышен лимит создания экземпляров самолетов.');
        }
        Plane.#instances++;

        // Задание 1
        if (maxHeight < Plane.#MIN_ALLOWED_HEIGHT || maxHeight > Plane.#MAX_ALLOWED_HEIGHT) {
            this.#maxHeightValue = this.DEFAULT_ALLOWED_HEIGHT;
        } else {
            this.#maxHeightValue = maxHeight;
        }

        // Задание 4
        if (!Plane.#speedCounts[cruiseSpeed]) {
            Plane.#speedCounts[cruiseSpeed] = 0;
        }
        if (Plane.#speedCounts[cruiseSpeed] >= 2) {
            throw new Error(`Самолет с крейсерской скоростью ${cruiseSpeed} км/ч не может быть создан более двух раз.`);
        }
        Plane.#speedCounts[cruiseSpeed]++;

        // Инициализация полей
        this.enginesCount = enginesCount;
        this.type = type || Plane.TYPE; // Установка типа (переданного или по умолчанию)

        // Первичная установка скорости через сеттер с валидацией (Задание 3)
        this.cruiseSpeed = cruiseSpeed;
    }

    // Задание 2
    #convertTypeToUpperCase() {
        return this.type.toUpperCase();
    }
    getCruiseSpeedInfo() {
        return `Крейсерская скорость самолета составляет ${this.#cruiseSpeed} км/ч.`;
    }
    getDetails() {
        const upperType = this.#convertTypeToUpperCase();
        return `Тип: ${upperType}, Двигателей: ${this.enginesCount}, Макс. высота: ${this.maxHeight} м`;
    }

    // Задание 3
    #isInRange(value, min, max) {
        return value >= min && value <= max;
    }
    get maxHeight() {
        return this.#maxHeightValue;
    }
    set maxHeight(height) {
        if (!this.#isInRange(height, Plane.#MIN_ALLOWED_HEIGHT, Plane.#MAX_ALLOWED_HEIGHT)) {
            throw new Error(`Высота полета должна быть в диапазоне от ${Plane.#MIN_ALLOWED_HEIGHT} до ${Plane.#MAX_ALLOWED_HEIGHT} м.`);
        }
        this.#maxHeightValue = height;
    }
    get cruiseSpeed() {
        return this.#cruiseSpeed;
    }
    set cruiseSpeed(speed) {
        if (!this.#isInRange(speed, Plane.#MIN_SPEED, Plane.#MAX_SPEED)) {
            throw new Error(`Крейсерская скорость должна быть в диапазоне от ${Plane.#MIN_SPEED} до ${Plane.#MAX_SPEED} км/ч.`);
        }
        this.#cruiseSpeed = speed;
    }
}


// Задание 5
class PassengerPlane extends Plane {
    #passengerSeats;

    constructor(cruiseSpeed, maxHeight, enginesCount, passengerSeats) {
        super(cruiseSpeed, maxHeight, enginesCount, 'Пассажирский самолет');
        this.passengerSeats = passengerSeats;
    }

    get passengerSeats() {
        return this.#passengerSeats;
    }
    set passengerSeats(seats) {
        if (seats < 0 || seats > 1000) {
            throw new Error('Количество пассажирских мест должно быть от 0 до 1000.');
        }
        this.#passengerSeats = seats;
    }
    getDetails() {
        return `${super.getDetails()}, Пассажирских мест: ${this.#passengerSeats}`;
    }
}

class CargoPlane extends Plane {
    #loadCapacity;

    constructor(cruiseSpeed, maxHeight, enginesCount, loadCapacity) {
        super(cruiseSpeed, maxHeight, enginesCount, 'Грузовой самолет');
        this.loadCapacity = loadCapacity;
    }

    get loadCapacity() {
        return this.#loadCapacity;
    }
    set loadCapacity(capacity) {
        if (capacity < 0 || capacity > 300000) {
            throw new Error('Грузоподъемность должна быть от 0 до 300000 кг.');
        }
        this.#loadCapacity = capacity;
    }
    getDetails() {
        return `${super.getDetails()}, Грузоподъемность: ${this.#loadCapacity} кг`;
    }
}