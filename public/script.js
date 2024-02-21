const CONFIG = {
    ROWS: 5,
    COLUMNS: 5
}
const container = document.querySelector('.container');

let nextPlayerO = false;
let fieldsArray = [[]];

class field{
    constructor({rowIndex,columnIndex}){
        this.id = id({rowIndex,columnIndex});
        this.element = document.createElement('button');
        this.element.classList.add('field');
        this.element.style.flexBasis = 100/CONFIG.COLUMNS + "%"
        this.element.style.height = 100/CONFIG.ROWS + "%"
        this.element.id = this.id;
        this.element.addEventListener('click', this.onClick.bind(this))
        container.appendChild(this.element);
    }
    onClick(ev){
        if(this.isUpdating){
            return;
        }
        //optimistic frissítem a state-et és a displayt.
        this.setState(nextPlayerO ? "o" : "x");
        //elküüldöm az ÚJ frontend state-et és az update-et. 
        fetch()
        //visszakapom hogy helyes-e az új
        //ha helyes akkor marad az optimistic update
        //ha helytelen lekérdezem az egész state-et, frissítem a state-et és a displayt
        fetch('/',{method:"PUT"}).then(val=>{
            this.
        })
    }
    setState(state){
        if(this.state === null){
            nextPlayerO = !nextPlayerO;
            this.prevState = this.state
            this.state = state;
            this.stateToDisplay();
            return true;
        }
        return false;
    }
    revertState(){
        this.state = this.prevState;
        stateToDisplay();
    }
    stateToDisplay(){
        this.element.innerHTML = this.state;
    }
}

function init(){   
    for (let rowIndex = 0; rowIndex < CONFIG.ROWS; rowIndex++) {
        fieldsArray[rowIndex] = [];
        for (let columnIndex = 0; columnIndex < CONFIG.COLUMNS; columnIndex++) {
            fieldsArray[rowIndex][columnIndex] = new field({rowIndex,columnIndex});
        }
    }
}


function fieldClicked(ev){
    fetch("/testEndpoint",{method: "PUT"}).then(fulfilledFieldUpdate)
}

function fulfilledFieldUpdate(val){

}

function id({rowIndex,columnIndex}){
    return `${rowIndex+1}-${columnIndex+1}`;
}


init();