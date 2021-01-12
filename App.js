class Minefield {
  constructor() {
    this.canvas = document.getElementById("game-area");
    this.context = this.canvas.getContext("2d");
    this.canvas.addEventListener('click', (e) => {
      let status = false;
      this.bombs.forEach(b => {
        if (b.positionX === Math.floor(e.offsetX / this.gridSize) && b.positionY === Math.floor(e.offsetY / this.gridSize)) {
          alert('Game over');
          status = true;
          this.init();
        }
      });
      if (!status) {
        let x = Math.floor(e.offsetX);
        let y = Math.floor(e.offsetY);
        this.context.fillStyle = 'yellow';
        this.context.fillRect(x, y, this.gridSize, this.gridSize);
        this.foundArea++;
        if (this.foundArea === 20) {
          alert('You won!');
          this.init();
        }
      }
    })
  }

  init() {
    this.bombs = [];
    this.gridSize = this.tileCount = 20;
    this.foundArea = 0;
    this.createBombs();
    this.draw();
  }

  draw() {
    this.context.fillStyle = 'grey';
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

    this.context.fillStyle = 'grey';
    this.bombs.forEach(t => {
      this.context.fillRect(t.positionX * this.gridSize, t.positionY * this.gridSize, this.gridSize, this.gridSize);
    });
  }

  createBombs() {
    const totalBombsNumber = Math.floor(Math.random() * (30 - 20) + 20);
    while (totalBombsNumber !== this.bombs.length) {
      let positionX = Math.floor(Math.random() * this.tileCount);
      let positionY = Math.floor(Math.random() * this.tileCount);
      if (this.bombs.length === 0) {
        this.bombs.push({
          positionX,
          positionY
        });
      } else {
        let status = false;
        this.bombs.forEach(b => {
          if (b.positionX === positionX && b.positionY === positionY) {
            status = true
          }
        })
        if (!status) {
          this.bombs.push({
            positionX,
            positionY
          });
        }
      }
    }
  }
}

const game = new Minefield();
window.onload = () => game.init();