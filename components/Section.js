export default class Section {
    constructor({items, renderer}, selector){
        this._items = items;
        this._container = document.querySelector(selector);
        this._renderer = renderer;
    }
    renderer() {
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}