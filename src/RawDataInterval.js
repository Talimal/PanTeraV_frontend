export  default class RawDataInterval {  
    constructor(symbol, startTime, endTime) {
      this.symbol = symbol;
      this.startTime = startTime;
      this.endTime = endTime;
    }

    getSymbol= ()=> this.symbol;
    getStartTime= ()=> this.startTime;
    getEndTime= ()=> this.endTime;

   toString = () =>{
     return "symbol: "+this.symbol+", start time: "
     +this.startTime+", end time: "+this.endTime;
   }

  }