import DataParser from "./DataParser";
import ButtonsBuilder from "./ButtonsBuilder";
import TableBuilder from "./TableBuilder";
export default class FutureTable {

    protected tableBuilder: TableBuilder;

    protected dataParser: DataParser;

    protected buttonsBuilder: ButtonsBuilder;
  

    protected settings = {
        hasBuilt: false,
    }

    constructor(protected container: HTMLElement) {
        container.classList.add('border','p-4','rounded-lg')
        this.tableBuilder = new TableBuilder(container);
        this.buttonsBuilder = new ButtonsBuilder(container);
    }

    public build(data:Array<Object>): void {
        if(this.settings.hasBuilt) throw new Error("FutureTable has already been built. Please use `update` method");
        // parse data using DataParser
        this.dataParser = new DataParser(data);
        // build table using parsed data
        this.tableBuilder.build(data);

        this.buttonsBuilder.build(data).onUpdate((filterData:Array<Object>)=>{
            this.tableBuilder.build(filterData);
        });

        this.settings.hasBuilt = true;
    }

    public update(data:Array<Object>){

    }
}