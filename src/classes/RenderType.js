export default class Type {
  width = 0;
  height = 0;
  props = [];
  canvas = null;
  context = null;

  constructor () {
    this.createCanvas();
  }

  createCanvas () {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
  }

  setSize (width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  draw () {
    this.setSize(this.width, this.height);
  }
}
