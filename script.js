const canvas = document.getElementById("canvas");
const resBtn = document.getElementById("resBtn");
const colorBtn = document.getElementById("colorBtn");
const canvasSelect = document.getElementById("canvasSelect");
const paletteSelect = document.getElementById("paletteSelect");
const shapeSelect = document.getElementById("cellShapeSelect");

colorBtn.onclick = () => generateArt();

function generateArt() {
  applyCanvas();
  applyRes();
  applyShape();
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
    option.textContent = palette;
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

function colorCells() {
  for (const child of canvas.children) {
    child.style.border = "none";
    coloring[paletteSelect.value + "Color"](child);
  }
}

const coloring = {
  randomColor: function (element) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    element.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  },
  transitColor: function (element) {
    const x = Math.floor(Math.random() * transitColorPalette.length);
    element.style.backgroundColor = transitColorPalette[x];
  },
  monoColor: function (element) {
    const x = Math.floor(Math.random() * monoColorPalette.length);
    element.style.backgroundColor = monoColorPalette[x];
  },
  mondrianColor: function (element) {
    const x = Math.floor(Math.random() * mondrianColorPalette.length);
    element.style.backgroundColor = mondrianColorPalette[x];
  },
  rainbowColor: function (element) {
    const x = Math.floor(Math.random() * rainbowColorPalette.length);
    element.style.backgroundColor = rainbowColorPalette[x];
  },
  marpatColor: function (element) {
    const x = Math.floor(Math.random() * marpatColorPalette.length);
    element.style.backgroundColor = marpatColorPalette[x];
  },
};

const transitColorPalette = ["black", "yellow", "cyan", "magenta"];

const monoColorPalette = [
  "#ffffff",
  "#c0c0c0",
  "#808080",
  "#404040",
  "#000000",
];

const mondrianColorPalette = ["black", "white", "red", "yellow", "blue"];

const rainbowColorPalette = [
  "#A587CA",
  "#36CEDC",
  "#8FE968",
  "#FFEA56",
  "#FFB750",
  "#FE797B",
];

const marpatColorPalette = ["#2e2c35", "#896e60", "#95837a", "#4e5b51"];

const canvasses = ["transparent", "white", "black", "lightgrey"];

const palettes = ["random", "transit", "mono", "mondrian", "rainbow", "marpat"];

const shapes = [
  { name: "Square", radius: "0" },
  { name: "Rounded", radius: "33%" },
  { name: "Circle", radius: "50%" },
];

populateCanvasses();
populatePalettes();
populateShapes();
