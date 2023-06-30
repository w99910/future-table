export default class DataParser {
  // attributes 
  // data
    public attributes:Array<string> = [];

    public data: Array<Array<any>> = [];
    
    constructor(data:Array<Object>){
         if(data.length === 0) throw new Error("DataParser: data is empty");
        this.parseAttributes(data);
        this.parseData(data);
    }

    parseAttributes(data:Array<Object>){
        this.attributes = Object.keys(data[0]);
    }

    parseData(data:Array<Object>){
        this.data = data.map((item:Object)=>{
            return Object.values(item);
        });
    }
}