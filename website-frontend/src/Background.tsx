import anime from "animejs";

const palette = {
  teal: "#00695f",
  black: "#18181b",
  dark_blue: "#282741",
  blue: "#2c387e",
};

const colorPicker = (() => {
  const colors = [palette.blue, palette.teal, palette.dark_blue, palette.black];
  let index = -1;
  function current() {
    if (index == -1) {
      return "#18181b";
    }
    return colors[index % colors.length];
  }
  function next() {
    index += 1;
    return current();
  }
  return {
    current,
    next,
  };
})();

class Circle {
  element: HTMLDivElement;
  x: number;
  y: number;
  targetR: number;

  constructor(x: number, y: number, targetR: number, color: string) {
    // update attributes
    this.x = x;
    this.y = y;
    this.element = document.createElement("div");
    this.targetR = targetR;

    // set attributes of the element
    this.element.classList.add("circle");
    this.element.style.backgroundColor = color;
    this.element.style.width = `${this.targetR}px`;
    this.element.style.height = `${this.targetR}px`;
    this.element.style.left = `${this.x - this.targetR / 2}px`;
    this.element.style.top = `${this.y - this.targetR / 2}px`;

    // add the element to the background
    document.getElementById("background")!.appendChild(this.element);
  }
}

function backgroundCircle(
  x: number,
  y: number,
  radius: number,
  duration: number,
  color: string
) {
  const backgroundCircle = new Circle(x, y, radius, color);
  anime({
    targets: backgroundCircle.element,
    scale: [0, 1],
    duration: duration,
    easing: "easeOutQuart",
    complete: () => {
      backgroundCircle.element.remove();
      document.getElementById("background")!.style.backgroundColor = color;
    },
  });
  return duration; // return the duration so that the overlay circle can use it
}

function overlayCircle(
  x: number,
  y: number,
  radius: number,
  color: string,
  duration: number
) {
  const backgroundCircle = new Circle(x, y, radius, color);
  anime({
    targets: backgroundCircle.element,
    scale: [0, 1],
    opacity: [1, 0],
    duration: duration,
    easing: "easeOutExpo",
    complete: () => {
      backgroundCircle.element.remove();
    },
  });
}

function particles(
  x: number,
  y: number,
  color: string,
  duration: number,
  maxSpread: number
) {
  let particles: Circle[] = [];
  for (let i = 0; i < 30; i++) {
    const particle = new Circle(x, y, anime.random(40, 70), color);
    particles.push(particle);
  }
  anime({
    targets: particles.map((particle) => particle.element),
    scale: 0,
    left: function (_p: Circle, i: number) {
      return anime.random(
        particles[i].x - maxSpread,
        particles[i].x + maxSpread
      );
    },
    top: function (_p: Circle, i: number) {
      return anime.random(
        particles[i].y - maxSpread,
        particles[i].y + maxSpread
      );
    },
    easing: "easeOutExpo",
    duration: duration,
    complete: () => {
      particles.forEach((particle) => particle.element.remove());
    },
  });
}

function updateBackground(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  const currColor = colorPicker.current();
  const nextColor = colorPicker.next();
  const x = e.clientX;
  const y = e.clientY;
  const w = Math.max(window.innerWidth - x, x);
  const h = Math.max(window.innerHeight - y, y);
  const backgroundRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) * 2;
  const overlayRadius = Math.max(window.innerWidth, window.innerHeight) / 3;
  const maxParticleSpread = overlayRadius / 1.75;
  const duration = backgroundRadius / 2;

  backgroundCircle(x, y, backgroundRadius, duration, nextColor);
  overlayCircle(x, y, overlayRadius, currColor, duration);
  particles(x, y, currColor, duration, maxParticleSpread);
}

function Background() {
  return (
    <>
      <div id="background"></div>
      <div id="background-overlay" onClick={updateBackground}></div>
    </>
  );
}

export default Background;
