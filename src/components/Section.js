export default class Section {
    constructor({items, renderer}, selector){
        this._items = items;
        this._container = document.querySelector(selector);
        this._renderer = renderer;
    }
    renderItems() {
        for (let i = this._items.length-1; i > 0; i--) {
            this.addItem(this._renderer(this._items[i]));
        }
    }
    addItem(element) {
        this._container.prepend(element);
    }
}