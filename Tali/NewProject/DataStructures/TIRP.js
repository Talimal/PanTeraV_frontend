export  default class TIRP {  
    constructor(size, symbols,symbolsNames, relations, numSupportEntities,
        meanHorSup, occurences,mean_of_first_interval,mean_offset_from_first_symbol) {
      this.size = size;
      this.symbols = symbols;
      this.symbolsNames=symbolsNames;
      this.relations = relations;
      this.numSupportEntities = numSupportEntities;
      this.meanHorSup = meanHorSup;
      this.occurences = occurences;
      this.mean_of_first_interval = mean_of_first_interval;
      this.mean_offset_from_first_symbol = mean_offset_from_first_symbol;
      this.name=[];
    }

    relationsJson = {
      '<':'before',
      'c':'contains',
      'm':'meet',
      's':'starts',
      'o':'overlap',
      'f':'finished-by',
      '=':'equal'
  }

    getSize= ()=> this.size;
    getSymbols= ()=> this.symbols;
    getSymbolsNames= ()=> this.symbolsNames;
    getRelations= ()=> this.relations;
    getNumSupEnt= ()=> this.numSupportEntities;
    getMeanHorSup= ()=> this.meanHorSup;
    getOccurences= ()=> this.occurences;
    get_mean_of_first_interval= ()=> this.mean_of_first_interval;
    get_mean_offset_from_first_symbol= ()=> this.mean_offset_from_first_symbol;
    getName = ()=>this.name;
    getLastSymbol = ()=>this.symbols[this.symbols.length-1]
    getFirstSymbol = ()=>this.symbols[0]
    getLastName = ()=>this.name[this.name.length-1]
    getFirstName = ()=>this.name[0]
    setName = (symbolNames)=>this.name=symbolNames;
    getReationsNames = ()=>this.relations.map((relation)=>this.relationsJson[relation]);

    getSymbolNameBySymbol = (symbol)=>this.symbolsNames[this.symbols.indexOf(symbol)];
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

    createEntityOccurMap = ()=>{
      let entityOccur = new Map();
      for(var entry=0 ; entry<this.occurences.length - 1 ; entry+=2){
        let entity = this.occurences[entry];
        let occurence = this.occurences[entry+1];
        entityOccur.has(entity)?
                  entityOccur.set(entity,
                          entityOccur.get(entity).concat(occurence))
                          :
                          entityOccur.set(entity,occurence);
      }
      return entityOccur;
    }
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
    printSymbolsNames = () =>{
      let toPrint="";
      for (var index in this.symbolNames){
        toPrint=toPrint+this.symbolNames[index]+"-";
      }
      console.log(this.symbolsNames);
      return toPrint.slice(0,-1);
    }
    
    printRelations = () =>{
      let toPrint="";
      for (var index in this.relations){
        toPrint=toPrint+this.relations[index]+".";
      }
      return toPrint.slice(0,-1);
    }

    printSupportingEnt  = () =>{
      return ("# supporting entities: "+this.numSupportEntities)
    }

    printMeanHorSup  = () =>{
      return ("Mean horizontal support: "+this.meanHorSup)
    }

    getIntervalsRelations = ()=>{
      
    }
    getVectorInSize = (vectorSize)=>{
      let vectorSymbols = [];
      let sumRelationTillNow = 0;
      let indexSymbol = vectorSize;
      for(var index=0; index<indexSymbol; index++){
        vectorSymbols.push(this.relations[sumRelationTillNow+indexSymbol-index-1]);
        sumRelationTillNow+=indexSymbol-index;
      }
      return vectorSymbols;
    }
    getSymbolInIndex = (symbolIndex)=>{
      if(symbolIndex<0 || symbolIndex>=this.symbols.length){
        return null;
      }
      return this.symbols[symbolIndex];
    }
    getIndexOfSymbol = (symbol)=>{
      return this.symbols.indexOf(symbol);
    }
    getRelationsOfSymbol = (symbol)=>{
      const vectorSize = this.getIndexOfSymbol(symbol);
      return this.getVectorInSize(vectorSize);
    }
  }