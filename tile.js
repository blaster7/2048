// Класс для плитки
export class Tile {
    constructor(gridElement) {
        this.tileElement = document.createElement('div');
        this.tileElement.classList.add('tile');
        this.setValue(Math.random() > 0.5 ? 2 : 4);
        gridElement.append(this.tileElement);
    }

    // Устанавливаем координаты плитки через CSS
    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty('--x', x);
        this.tileElement.style.setProperty('--y', y);
    }

    // Устанавливаем плитке: цифру, цвет фона, цвет цифры
    setValue(value) {
        this.value = value;
        this.tileElement.textContent = this.value;
        // Цвет плитки
        // 2 -> 100 - 1*9 -> 91; 2048 -> 100 - 11*9 -> 1
        const bgLightness = 100 - Math.log2(value) * 9;
        const textLightness = (bgLightness < 50) ? 90 : 10;
        this.tileElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
        this.tileElement.style.setProperty('--text-lightness', `${textLightness}%`);
    }

    removeFromDOM() {
        this.tileElement.remove();
    }

    waitForTransitionEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener('transitionend', resolve, {once: true});
        })
    }

    waitForAnimationEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener('animationend', resolve, {once: true});
        })
    }
}
