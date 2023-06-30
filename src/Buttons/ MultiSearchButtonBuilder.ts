import DataParser from "../DataParser";
import ButtonBuilderInterface from "../Interface/ButtonBuilderInterface";

// Expected behavior: 
// - when one search keyword is added, the new button will be added 
// - search keyword can be removed by clicking the button
// - searching 

export default class MultiSearchButtonBuilder implements ButtonBuilderInterface {
    protected searchKeywords:Array<string> = [];

    protected callback:Function; 

    protected buttonContainer : HTMLElement;

    constructor() {

    }

    build(buttonContainer: HTMLElement, onUpdateCallback:Function): void {
        this.buttonContainer = buttonContainer;
        this.callback = onUpdateCallback;
        this.buildButton();
    }

    protected buildButton(){
        const searchElement = document.createElement('div');
        searchElement.className = 'future-table-search p-1 border border-gray-500 rounded border-dashed flex text-gray-600 text-sm items-center gap-x-2';
        this.buttonContainer.appendChild(searchElement);
        const span = document.createElement('span');
        span.className = 'future-table-search-label';
        span.innerText = 'Search:';
        searchElement.appendChild(span);
        const searchInput = document.createElement('input');
        searchInput.className = 'future-table-search-input';
        searchInput.placeholder = '...';
        searchInput.type = 'text';
        searchInput.style.width = '2ch';
        searchInput.style.border = 'none';
        searchInput.style.outline = 'none';
        searchInput.addEventListener('change',(e)=>{
            searchInput.disabled = true;
            const removeButton = document.createElement('button');
            removeButton.className = 'future-table-search-remove';
            removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-red-400"><line x1="5" x2="19" y1="12" y2="12"/></svg>';
            removeButton.addEventListener('click',(e)=>{
                searchElement.remove();
                let index = this.searchKeywords.indexOf(searchInput.value);
                this.searchKeywords.splice(index,1);
                this.callback();
            })
            this.searchKeywords.push(searchInput.value);
            searchElement.appendChild(removeButton);
            this.callback();
            this.buildButton();
        });
        searchInput.addEventListener('input',(e)=>{
            searchInput.style.width = `${(e.target! as HTMLInputElement).value.length}ch`;
        });
        searchElement.appendChild(searchInput);
    }

    process(data:Array<Object>): Array<Object> {
        if(this.searchKeywords.length === 0)return data;
        let temp:Array<Object> = [];
        this.searchKeywords.forEach((keyword)=>{
            data.forEach((row)=>{
             const values = Object.values(row);
                values.forEach((value)=>{
                    if(value.toString().includes(keyword)){
                        temp.push(row);
                    }
                })
           })      
        })
        return temp;
    }
}