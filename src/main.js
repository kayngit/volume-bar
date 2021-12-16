const btnPluse = document.querySelector('#pluse');
const btnMinus = document.querySelector('#minus');
const value = document.querySelector('.value')
const bar = document.querySelector('.barbar');
let volume = 1;
const step = 0.1;
let currentX = 0;
const width = bar.parentElement.offsetWidth;
let moveFlag = false;

function eventHandler(event) {
    switch (event.type) {
        case 'click':
            volume += step * (event.currentTarget === btnPluse ? 1 : -1);

            if (volume < 0) {
                volume = 0;
            } else if (volume > 1) {
                volume = 1;
            }

            redraw();
            break;
        case 'mousedown':
            currentX = event.pageX;
            break;
        case 'mousemove':
            if (!currentX) {
                return;
            }

            moveFlag = true;

            const x = event.pageX - currentX;
            const q = x / width;

            volume += q;

            if (volume < 0) {
                volume = 0;
            } else if (volume > 1) {
                volume = 1;
            }

            redraw();

            currentX = event.pageX;
            break;
        case 'mouseup':
            setTimeout(() => moveFlag = false, 10);
            currentX = 0
    }
}

function redraw() {
    const currentValue = Math.floor(100 * volume);
    bar.style.width = `${currentValue}%`;
    value.innerHTML = `${currentValue}%`;
}

btnPluse.addEventListener('click', eventHandler);
btnMinus.addEventListener('click', eventHandler);
bar.parentElement.addEventListener('mousedown', eventHandler);
document.addEventListener('mousemove', eventHandler);
document.addEventListener('mouseup', eventHandler);

bar.parentElement.addEventListener('click', event => {
    if (moveFlag) {
        return;
    }
    volume = event.offsetX / width;
    redraw();
});