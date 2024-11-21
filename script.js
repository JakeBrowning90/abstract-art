const canvas = document.getElementById("canvas");
const resBtn = document.getElementById("resBtn");
const colorBtn = document.getElementById("colorBtn");
const canvasSelect = document.getElementById("canvasSelect");
const paletteSelect = document.getElementById("paletteSelect");
const shapeSelect = document.getElementById("cellShapeSelect");
const marginSelect = document.getElementById("cellMarginSelect");
const rotationSelect = document.getElementById("cellRotateSelect");

colorBtn.onclick = () => generateArt();

function generateArt() {
  applyCanvas();
  applyRes();
  applyShape();
  applyMargin();
  applyRotation();
  colorCells();
}

function applyRes() {
  while (canvas.firstChild) {
    canvas.removeChild(canvas.lastChild);
  }

  let x = document.getElementById("resNum").value;
  canvas.style.gridTemplateRows = `repeat(${x}, 1fr)`;
  canvas.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
  for (let i = 0; i < x * x; i++) {
    const cell = document.createElement("div");
    cell.classList = "cell";
    canvas.appendChild(cell);
  }
}

function applyCanvas() {
  canvas.style.backgroundColor = document.getElementById("canvasSelect").value;
}

function applyShape() {
  let shape = document.getElementById("cellShapeSelect").value;
  for (const child of canvas.children) {
    child.style.borderRadius = shape;
  }
}

function applyMargin() {
  let margin = document.getElementById("cellMarginSelect").value * 5;
  for (const child of canvas.children) {
    child.style.margin = margin + "%";
  }
}

function applyRotation() {
  let rotation = document.getElementById("cellRotateSelect").value;
  for (const child of canvas.children) {
    child.style.transform = "rotate(" + rotation + "deg)";
  }
}

function populateCanvasses() {
  canvasses.forEach((canvas) => {
    const option = document.createElement("option");
    option.textContent = canvas;
    option.value = canvas;
    canvasSelect.appendChild(option);
  });
}

function populatePalettes() {
  palettes.forEach((palette) => {
    const option = document.createElement("option");
    option.textContent = palette.name;
    option.value = palettes.indexOf(palette);
    paletteSelect.appendChild(option);
  });
}

function populateShapes() {
  shapes.forEach((shape) => {
    const option = document.createElement("option");
    option.textContent = shape.name;
    option.value = shape.radius;
    shapeSelect.appendChild(option);
  });
}

function populateMargins() {
  for (let i = 0; i <= 9; i++) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    marginSelect.appendChild(option);
  }
}

function colorCells() {
  console.log(paletteSelect.value);
  for (const child of canvas.children) {
    child.style.border = "none";
    palettes[paletteSelect.value].application(child);
  }
}

const canvasses = ["transparent", "white", "black", "lightgrey"];

const palettes = [
  {
    name: "Random",
    // palette: [ NONE FOR RANDOM ],
    application(element) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    },
  },
  {
    name: "Transit",
    palette: ["black", "yellow", "cyan", "magenta"],
    application(element) {
      const x = Math.floor(Math.random() * this.palette.length);
      element.style.backgroundColor = this.palette[x];
    },
  },
  {
    name: "Rainbow",
    palette: ["#A587CA", "#36CEDC", "#8FE968", "#FFEA56", "#FFB750", "#FE797B"],
    application(element) {
      const x = Math.floor(Math.random() * this.palette.length);
      element.style.backgroundColor = this.palette[x];
    },
  },
  {
    name: "Mondrian",
    palette: ["black", "white", "red", "yellow", "blue"],
    application(element) {
      const x = Math.floor(Math.random() * this.palette.length);
      element.style.backgroundColor = this.palette[x];
    },
  },
  {
    name: "Mono",
    palette: ["#ffffff", "#c0c0c0", "#808080", "#404040", "#000000"],
    application(element) {
      const x = Math.floor(Math.random() * this.palette.length);
      element.style.backgroundColor = this.palette[x];
    },
  },
  {
    name: "MARPAT",
    palette: ["#2e2c35", "#896e60", "#95837a", "#4e5b51"],
    application(element) {
      const x = Math.floor(Math.random() * this.palette.length);
      element.style.backgroundColor = this.palette[x];
    },
  },
];

const shapes = [
  { name: "Square", radius: "0" },
  { name: "Rounded", radius: "33%" },
  { name: "Circle", radius: "50%" },
];

populateCanvasses();
populatePalettes();
populateShapes();
populateMargins();
