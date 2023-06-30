import DataParser from "../DataParser";

export default interface ButtonBuilderInterface {
    process(data:Array<Object>): Array<Object>;

    build(buttonContainer:HTMLElement, onUpdateCallback:Function):void;
}