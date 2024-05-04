import anime from "animejs";

const colorPicker = (() => {
  const colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
  let index = 0;
  function current() {
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
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  color: string
) {
  const x = e.clientX;
  const y = e.clientY;
  const w = Math.max(window.innerWidth - x, x);
  const h = Math.max(window.innerHeight - y, y);
  const targetR = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) * 2;
  const backgroundCircle = new Circle(x, y, targetR, color);
  const duration = targetR / 2;
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
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  color: string,
  duration: number
) {
  const x = e.clientX;
  const y = e.clientY;
  const targetR = Math.max(window.innerWidth, window.innerHeight) / 3;
  const backgroundCircle = new Circle(x, y, targetR, color);
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
  return targetR;
}

function particles(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  color: string,
  duration: number,
  overlaySize: number
) {
  const x = e.clientX;
  const y = e.clientY;

  let particles: Circle[] = [];
  for (let i = 0; i < 30; i++) {
    const particle = new Circle(x, y, anime.random(50, 100), color);
    particles.push(particle);
  }
  anime({
    targets: particles.map((particle) => particle.element),
    scale: 0,
    left: function (p: Circle, i: number) {
      return anime.random(
        particles[i].x - overlaySize / 2,
        particles[i].x + overlaySize / 2
      );
    },
    top: function (p: Circle, i: number) {
      return anime.random(
        particles[i].y - overlaySize / 2,
        particles[i].y + overlaySize / 2
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
  const duration = backgroundCircle(e, nextColor);
  const overlaySize = overlayCircle(e, currColor, duration);
  particles(e, currColor, duration, overlaySize);
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
