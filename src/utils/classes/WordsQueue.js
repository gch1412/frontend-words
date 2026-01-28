export default class WordsQueue {
    constructor(data) {
        this.first = data[0]
        this.last = data[data.length - 1]
        this.data = data
        this._selected = this.first
    }

    previous = () => {
        if(this.selected == this.first){
            this.selected = this.selected
        } else {
            this.selected = this.data[this.data.indexOf(this.selected) - 1]
        }

        return this.selected
    }

    next = () => {
        if(this.selected == this.last){
            this.selected = this.selected
        } else {
            this.selected = this.data[this.data.indexOf(this.selected) + 1]
        }

        return this.selected
    }

    get selected(){
        return this._selected
    }

    set selected(value){
        return this._selected = value
    }
}