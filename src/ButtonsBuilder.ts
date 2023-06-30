import MultiSearchButtonBuilder from "./Buttons/ MultiSearchButtonBuilder";
import DataParser from "./DataParser";
import ButtonBuilderInterface from "./Interface/ButtonBuilderInterface";

export default class ButtonsBuilder{
    protected settings = {
        enableSearch: true,
        enableFilter: true,
        enableSort: true,
    }

    protected buttonContainer :HTMLElement;

    protected initialData: Array<Object>;

    protected onUpdateCallbacks:Array<(data:Array<Object>) => void> = [];

      protected buttonBuilders: Array<ButtonBuilderInterface> = [
        new MultiSearchButtonBuilder,
    ];

    protected buttons:Array<ButtonBuilderInterface> = [];

    constructor(protected container:HTMLElement){
        this.buttonContainer = document.createElement('div');
        this.buttonContainer.className = 'future-table-buttons-container flex items-center gap-x-2 w-full';
        this.container.prepend(this.buttonContainer);
    }

    public onUpdate(callback:(data:Array<Object>)=>void){
        this.onUpdateCallbacks.push(callback);
        return this;
    }

        public addButton(button:ButtonBuilderInterface){
        this.buttonBuilders.push(button);
        return this;
    }

    public resetButton(){
        this.buttonBuilders = [];
        return this;
    }

    public process(){
        let data = this.initialData;
        console.log(this.buttons);
        this.buttonBuilders.forEach((button)=>{
           data = button.process(data);
        })
         this.onUpdateCallbacks.forEach((callback)=>{
           callback(data);
        })
    }


    public build(data:Array<Object>){
        this.initialData = data;

        this.buttonBuilders.forEach((buttonBuilder)=>{
            buttonBuilder.build(this.buttonContainer,()=>{
                this.process()
            });
        });

        return this;
    }
}