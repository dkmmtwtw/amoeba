const CONFIG = {
    ROWS: 5,
    COLUMNS: 5
}
const container = document.querySelector('.container');

let nextPlayerO = false;
let fieldsObj = {};

class field{
    constructor({rowIndex,columnIndex}){
        this.id = id({rowIndex,columnIndex});
        this.state = null;
        this.element = document.createElement('button');
        this.element.classList.add('field');
        this.element.style.flexBasis = 100/CONFIG.COLUMNS + "%"
        this.element.style.height = 100/CONFIG.ROWS + "%"
        this.element.id = this.id;
        this.element.addEventListener('click', this.onClick.bind(this))
        container.appendChild(this.element);
    }
    onClick(ev){

        //oké tehát: elküldi a prediction-t és az inputot. kap egy truet vagy egy false-t. true: ne figyelj a következő x időben arra a broadcastra amelyiknek benne van az id listjében az inputodé. false: revert animation és figyel a broadcastokra.
        if(this.isUpdating){
            return;
        }
        //optimistic frissítem a state-et és a displayt.
        if(this.setState()){
            //itt forntend szerint legális a move
            fetch('/',{method:"PUT",data:JSON.stringify({fieldsObj,id:this.id,date:Date()})})
            .then(val=> val.json())
            .then(val => {
                //backend szerint legális a move?
                console.log("fetch PUT response:")
                console.dir(val)
            })
        }
        //elküüldöm az ÚJ frontend state-et és az update-et. 
        //visszakapom hogy helyes-e az új
        //ha helyes akkor marad az optimistic update
        //ha helytelen lekérdezem az egész state-et, frissítem a state-et és a displayt
        
    }
    setState(){
        //return if legal, store previous, change player, update display, 
        if(this.state === null){
            nextPlayerO = !nextPlayerO;
            this.prevState = this.state
            this.state = nextPlayerO ? "o" : "x";
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
        for (let columnIndex = 0; columnIndex < CONFIG.COLUMNS; columnIndex++) {
            const curr =  {rowIndex,columnIndex};
            fieldsObj[id(curr)] = new field(curr);
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


const ws = new WebSocket('ws://localhost:8080');

ws.onopen = function() {
    console.log('Connected to WebSocket server');
    ws.send('Hello from client!');
};

ws.onmessage = function(event) {
    console.log('Received message from server:', event.data);
};

// Example: Send message to server
