const GRID_SIZE = 4
const CELL_SIZE = 20 
const CELL_GAP = 2

export default class Grid {

    #cells /* (this way cells can only be accessed inside this class) */


    constructor(gridElement) {
        gridElement.style.setProperty("--grid-size", GRID_SIZE)
        gridElement.style.setProperty("--cell-size", `${CELL_SIZE}vmin`)
        gridElement.style.setProperty("--cell-gap", `${CELL_GAP}vmin`)
        this.#cells = createCellElements(gridElement).map((cellElement, index) => {
            return new Cell
            (cellElement, index % GRID_SIZE, Math.floor(index / GRID_SIZE))
        })
    }

    get cellsByRow(){ 
        return this.#cells.reduce((cellGrid, cell) => { 
          cellGrid[cell.y] = cellGrid[cell.y] || []
          cellGrid[cell.y][cell.x] = cell 
          return cellGrid 
        }, [])
    }

    get cellsByColumn(){ //takes the normal cells, and returns a new array which organizes them by column
        return this.#cells.reduce((cellGrid, cell) => { //created an array of an array 
          cellGrid[cell.x] = cellGrid[cell.x] || []
          cellGrid[cell.x][cell.y] = cell 
          return cellGrid 
        }, [])
    }

    get cells(){
        return this.#cells
    }

    get #emptyCells() {
        return this.#cells.filter(cell => cell.tile == null)
    }

    randomEmptyCell() { /* (return a random cell that is empty) */
        const randomIndex = Math.floor(Math.random() * this.#emptyCells.length)
        return this.#emptyCells[randomIndex]
    }
}

class Cell{
    #cellElement
    #x
    #y
    #tile
    #mergeTile 
cellElement
    constructor(cellElement, x, y) {
    this.#cellElement = cellElement
    this.#x = x
    this.#y = y
    }

    get x() {
        return this.#x
    }

    get y() {
        return this.#y
    }


    get tile() {
        return this.#tile
    }

    set tile(value) {
        this.#tile = value 
        if (value == null) return
        this.#tile.x = this.#x 
        this.#tile.y = this.#y
    }

    get mergeTile(){
        return this.#mergeTile
    }
    
    set mergeTile(value){
        this.#mergeTile = value 
        if (value == null) return 
        this.#mergeTile.x = this.#x 
        this.#mergeTile.y = this.#y
    }

    canAccept(tile){ 
        return(
            this.tile == null || (this.mergeTile == null && this.tile.value === tile.value)
        )
    }

    mergeTiles(){
        if (this.tile == null || this.mergeTile == null) return 
        this .tile.value = this.tile.value + this.mergeTile.value 
        this.#mergeTile.remove()
        this.mergeTile = null
    }

}

function createCellElements(gridElement){ /* (this creates all of our cell elements and returns them) */
    const cells = []
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement("div")
    cell.classList.add("cell")
    cells.push(cell)
    gridElement.append(cell) /* (adding element to our page and the array) */
    }
    return cells;
}