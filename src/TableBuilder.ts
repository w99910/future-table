import DataParser from "./DataParser";

export default class TableBuilder{
    protected table:HTMLElement;

    constructor(protected container:HTMLElement){
    }

    build(data:Array<Object>){
        let emptyState = this.container.querySelector('.future-table-empty-state');
        if(data.length === 0) {
            if(emptyState)return true;
            return this.showEmptyState();
        }
        if(emptyState){
            emptyState.remove();
        }
        this.buildTable();
        this.buildHeaders(Object.keys(data[0]));
        this.buildRows(data);
    }

    protected showEmptyState(){
        this.container.querySelector('table')?.remove();
        let emptyState = document.createElement("div");
        emptyState.className = 'future-table-empty-state flex items-center justify-center w-full h-full';
        emptyState.innerText = 'No data available';
        this.container.appendChild(emptyState);
    }

    protected buildTable(){
        let existingTable = this.container.querySelector('table');
        if(existingTable)existingTable.remove();
        this.table = document.createElement("table");
        this.table.className = 'future-table-table w-full h-full';
        this.container.appendChild(this.table);
    }

    protected buildHeaders(attributes:Array<string>){
        let thead = document.createElement("thead");
        thead.classList.add('future-table-thead');
        let tr = document.createElement('tr');
        tr.className = 'future-table-tr border-b';
        attributes.forEach((attribute)=>{
           let th = document.createElement('th');
           th.className = 'future-table-th py-2 font-bold capitalize text-lg';
           th.innerText = attribute;  
           tr.appendChild(th);   
        })
        thead.appendChild(tr);
        this.table.appendChild(thead);
    }

    protected buildRows(data:Array<Object>){
        let tbody = document.createElement("tbody");
        tbody.classList.add('future-table-tbody');
        data.forEach((row,index)=>{
            let tr = document.createElement("tr");
            tr.className = 'future-table-tr';
            if(index !== data.length - 1){
                tr.classList.add('border-b')
            }
            Object.values(row).forEach((datum)=>{
                let td = document.createElement('td');
                td.className = 'future-table-td p-2';
                if(datum instanceof Function){
                  td.innerHTML = datum(row,this);
                } else {
                    td.innerText = datum;
                }
                tr.appendChild(td)
            })
            tbody.appendChild(tr);
        })
        this.table.appendChild(tbody);
    }
}