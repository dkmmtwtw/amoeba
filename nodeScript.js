const express =require("express");
const {broadcast} = require("./webSocketBusiness")
const app = express();

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.redirect('/index.html');
});

let gamestate = {
  state:[],
  makeStep: () => this.isLegal(),
  isLegal: () =>true,
  reset: () => {},
  getField: (id) => "x"
}

setInterval(update, 50);
function update(){
  //process request queue fifo and broadcast whatever 
  //
}

let isUpdating = false;
let boolean = false;
app.put('*',(req,res) => {
  boolean = !boolean;
  broadcast('Event data to send to clientsasd');
  res.json({boolean})
})

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
