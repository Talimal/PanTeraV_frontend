export  default class TIRP {
    constructor(size, symbols, relations, numSupportEntities,
        meanHorSup, occurences) {
      this.size = size;
      this.symbols = symbols;
      this.relations = relations;
      this.numSupportEntities = numSupportEntities;
      this.meanHorSup = meanHorSup;
      this.occurences = occurences;
    }

    getSize= ()=> this.size;
    getSymbols= ()=> this.symbols;
    getRelations= ()=> this.relations;
    getNumSupEnt= ()=> this.numSupportEntities;
    getMeanHorSup= ()=> this.meanHorSup;
    getOccurences= ()=> this.occurences;

   toString = () =>{
     return "size: "+this.size+", symbols: "
     +this.symbols+", relations: "+this.relations
     +", sup ent: "+this.numSupportEntities
     +", mean hor: "+this.meanHorSup
     +", occurences: "+this.occurences;
   }
  }