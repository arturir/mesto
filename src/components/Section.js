export default class Section {
    constructor(renderer, selector){
        this._container = document.querySelector(selector);
        this._renderer = renderer;
    }
    renderItems(items) {
        for (let i = items.length-1; i >= 0; i--) {
            this._addItem(this._renderer(items[i]));
        }
    }
    _addItem(element) {
        this._container.prepend(element);
    }
}