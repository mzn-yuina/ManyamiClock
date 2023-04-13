/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');

const w = canvas.width;
const h = canvas.height;


const loadImage = (path) => {
  const img = new Image();
  img.src = path;
  return img;
}

class Hand {
  constructor(src, x, y) {
    this.path = src;
    this.x = x;
    this.y = y;

    this.image = new Image();
    this.image.src = src;
  }

  /**
   * 
   * @param {CanvasRenderingContext2D} ctx 
   * @param {*} rad 
   */
  drawImage(ctx, rad) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(rad);
    ctx.translate(-this.image.width / 2, - this.image.height / 2);
    ctx.drawImage(this.image, 0, 0);
    ctx.restore();
  }
}

const base = loadImage('img/時計盤.png');

const second = new Hand('img/秒針.png', 68, 141);
const minute = new Hand('img/分針.png', 143, 172);
const hour = new Hand('img/時針.png', 134, 143);
const hour24 = new Hand('img/24時間針.png', 186, 126);

setInterval(() => {
  const pi2 = Math.PI * 2;

  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle='#63629c';
  ctx.beginPath();
  ctx.arc(w/2, h/2, 128, 0, pi2, false);
  ctx.fill();

  const now = new Date();
  const totalSeconds = now.getHours() * 60 * 60 + now.getMinutes() * 60 + now.getSeconds(); // + now.getMilliseconds() / 1000;

  ctx.drawImage(base, 0, 0);
  second.drawImage(ctx, totalSeconds / 60 * pi2);
  minute.drawImage(ctx, totalSeconds / (60 * 60) * pi2);
  hour.drawImage(ctx, totalSeconds / (12 * 60 * 60) * pi2);
  hour24.drawImage(ctx, totalSeconds / (24 * 60 * 60) * pi2);
}, 100);
