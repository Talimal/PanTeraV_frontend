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

  //  my own equal implementation - to compare 2 tirps
   equalTirp = (other) =>
     this.size===other.getSize() && 
     this.compareArrays (this.symbols, other.getSymbols()) &&
     this.compareArrays (this.relations, other.getRelations()) &&
     this.numSupportEntities===other.getNumSupEnt() &&
     this.meanHorSup===other.getMeanHorSup() &&
     this.compareArrays (this.occurences, other.getOccurences()) 

  //  my function to compare 2 arrays - if all elements are equal
    compareArrays = (arr1,arr2) => {
       // compare lengths - can save a lot of time 
      if (arr1.length !== arr2.length)
        return false;

      for (var i = 0, l=arr1.length; i < l; i++) {
            if (arr1[i]!==arr2[i])
                return false;       
      }           
        
      return true;
    }

    printSymbols = () =>{
      let toPrint="";
      for (var index in this.symbols){
        toPrint=toPrint+this.symbols[index]+"-";
      }
      return toPrint.slice(0,-1);
    }
    printRelations = () =>{
      let toPrint="";
      for (var index in this.relations){
        toPrint=toPrint+this.relations[index]+".";
      }
      return toPrint.slice(0,-1);
    }
  }