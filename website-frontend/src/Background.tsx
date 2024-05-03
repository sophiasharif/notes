import anime from "animejs";

const getColor = (() => {
  const colors = ["#FF6138", "#FFBE53", "#2980B9", "#282741"];
  let index = 0;
  function getColor() {
    index += 1;
    return colors[index % colors.length];
  }
  return getColor;
})();

class Circle {
  element: HTMLDivElement;
  x: number;
  y: number;
  targetR: number;

  constructor(
    x: number,
    y: number,
    targetR: number,
    duration: number,
    color: string
  ) {
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

    // animate the element
    anime({
      targets: this.element,
      scale: [0, 1],
      duration: duration,
      complete: () => {
        this.element.remove();
        document.getElementById("background")!.style.backgroundColor = color;
      },
    });
  }
}

function updateBackground(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  new Circle(e.clientX, e.clientY, window.innerWidth * 2, 4000, getColor());
  //   new Circle(e.clientX, e.clientY, 100, 1000, getColor());
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
