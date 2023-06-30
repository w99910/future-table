class u {
  constructor(t) {
    if (this.attributes = [], this.data = [], t.length === 0)
      throw new Error("DataParser: data is empty");
    this.parseAttributes(t), this.parseData(t);
  }
  parseAttributes(t) {
    this.attributes = Object.keys(t[0]);
  }
  parseData(t) {
    this.data = t.map((e) => Object.values(e));
  }
}
class o {
  constructor() {
    this.searchKeywords = [];
  }
  build(t, e) {
    this.buttonContainer = t, this.callback = e, this.buildButton();
  }
  buildButton() {
    const t = document.createElement("div");
    t.className = "future-table-search p-1 border border-gray-500 rounded border-dashed flex text-gray-600 text-sm items-center gap-x-2", this.buttonContainer.appendChild(t);
    const e = document.createElement("span");
    e.className = "future-table-search-label", e.innerText = "Search:", t.appendChild(e);
    const s = document.createElement("input");
    s.className = "future-table-search-input", s.placeholder = "...", s.type = "text", s.style.width = "2ch", s.style.border = "none", s.style.outline = "none", s.addEventListener("change", (r) => {
      s.disabled = !0;
      const a = document.createElement("button");
      a.className = "future-table-search-remove", a.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-red-400"><line x1="5" x2="19" y1="12" y2="12"/></svg>', a.addEventListener("click", (l) => {
        t.remove();
        let i = this.searchKeywords.indexOf(s.value);
        this.searchKeywords.splice(i, 1), this.callback();
      }), this.searchKeywords.push(s.value), t.appendChild(a), this.callback(), this.buildButton();
    }), s.addEventListener("input", (r) => {
      s.style.width = `${r.target.value.length}ch`;
    }), t.appendChild(s);
  }
  process(t) {
    if (this.searchKeywords.length === 0)
      return t;
    let e = [];
    return this.searchKeywords.forEach((s) => {
      t.forEach((r) => {
        Object.values(r).forEach((l) => {
          l.toString().includes(s) && e.push(r);
        });
      });
    }), e;
  }
}
class h {
  constructor(t) {
    this.container = t, this.settings = {
      enableSearch: !0,
      enableFilter: !0,
      enableSort: !0
    }, this.onUpdateCallbacks = [], this.buttonBuilders = [
      new o()
    ], this.buttons = [], this.buttonContainer = document.createElement("div"), this.buttonContainer.className = "future-table-buttons-container flex items-center gap-x-2 w-full", this.container.prepend(this.buttonContainer);
  }
  onUpdate(t) {
    return this.onUpdateCallbacks.push(t), this;
  }
  addButton(t) {
    return this.buttonBuilders.push(t), this;
  }
  resetButton() {
    return this.buttonBuilders = [], this;
  }
  process() {
    let t = this.initialData;
    console.log(this.buttons), this.buttonBuilders.forEach((e) => {
      t = e.process(t);
    }), this.onUpdateCallbacks.forEach((e) => {
      e(t);
    });
  }
  build(t) {
    return this.initialData = t, this.buttonBuilders.forEach((e) => {
      e.build(this.buttonContainer, () => {
        this.process();
      });
    }), this;
  }
}
class d {
  constructor(t) {
    this.container = t;
  }
  build(t) {
    let e = this.container.querySelector(".future-table-empty-state");
    if (t.length === 0)
      return e ? !0 : this.showEmptyState();
    e && e.remove(), this.buildTable(), this.buildHeaders(Object.keys(t[0])), this.buildRows(t);
  }
  showEmptyState() {
    var e;
    (e = this.container.querySelector("table")) == null || e.remove();
    let t = document.createElement("div");
    t.className = "future-table-empty-state flex items-center justify-center w-full h-full", t.innerText = "No data available", this.container.appendChild(t);
  }
  buildTable() {
    let t = this.container.querySelector("table");
    t && t.remove(), this.table = document.createElement("table"), this.table.className = "future-table-table w-full h-full", this.container.appendChild(this.table);
  }
  buildHeaders(t) {
    let e = document.createElement("thead");
    e.classList.add("future-table-thead");
    let s = document.createElement("tr");
    s.className = "future-table-tr border-b", t.forEach((r) => {
      let a = document.createElement("th");
      a.className = "future-table-th py-2 font-bold capitalize text-lg", a.innerText = r, s.appendChild(a);
    }), e.appendChild(s), this.table.appendChild(e);
  }
  buildRows(t) {
    let e = document.createElement("tbody");
    e.classList.add("future-table-tbody"), t.forEach((s, r) => {
      let a = document.createElement("tr");
      a.className = "future-table-tr", r !== t.length - 1 && a.classList.add("border-b"), Object.values(s).forEach((l) => {
        let i = document.createElement("td");
        i.className = "future-table-td p-2", l instanceof Function ? i.innerHTML = l(s, this) : i.innerText = l, a.appendChild(i);
      }), e.appendChild(a);
    }), this.table.appendChild(e);
  }
}
class c {
  constructor(t) {
    this.container = t, this.settings = {
      hasBuilt: !1
    }, t.classList.add("border", "p-4", "rounded-lg"), this.tableBuilder = new d(t), this.buttonsBuilder = new h(t);
  }
  build(t) {
    if (this.settings.hasBuilt)
      throw new Error("FutureTable has already been built. Please use `update` method");
    this.dataParser = new u(t), this.tableBuilder.build(t), this.buttonsBuilder.build(t).onUpdate((e) => {
      this.tableBuilder.build(e);
    }), this.settings.hasBuilt = !0;
  }
  update(t) {
  }
}
export {
  c as FutureTable
};
