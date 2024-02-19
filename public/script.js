const CONFIG = {
    ROWS: 5,
    COLUMNS: 5
}

const container = document.querySelector('.container');
for (let rowIndex = 0; rowIndex < CONFIG.ROWS; rowIndex++) {
    for (let columnIndex = 0; columnIndex < CONFIG.COLUMNS; columnIndex++) {
        const element = document.createElement('button');
        element.classList.add('field');
        element.id = `${rowIndex+1}-${columnIndex+1}`
        element.addEventListener('click', fieldClicked)
        container.appendChild(element);
    }
}
function fieldClicked(ev){
    
}