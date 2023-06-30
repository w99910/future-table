import ButtonBuilderInterface from "../Interface/ButtonBuilderInterface";

export default class SortButtonBuilder implements ButtonBuilderInterface {
    process(data: Object[]): Object[] {
        throw new Error("Method not implemented.");
    }
    build(buttonContainer: HTMLElement, onUpdateCallback: Function): void {
        throw new Error("Method not implemented.");
    }
    
}