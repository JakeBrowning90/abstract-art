const canvas = document.getElementById("canvas");
const resBtn = document.getElementById("resBtn");
const colorBtn = document.getElementById("colorBtn");
const paletteSelect = document.getElementById("paletteSelect");

// resBtn.onclick = () => applyRes();
colorBtn.onclick = () => generateArt();

function generateArt() {
  applyRes()
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

function populateSelect() {
  palettes.forEach((palette) => {
    const option = document.createElement("option");
    option.textContent = palette;
    paletteSelect.appendChild(option);
  });
}

function colorCells() {
  for (const child of canvas.children) {
    child.style.border = "none";
    coloring[paletteSelect.value + 'Color'](child)
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
    const x = Math.floor(Math.random() * 4);
    element.style.backgroundColor = transitColorPalette[x];
  },
  monoColor: function (element) {
    const x = Math.floor(Math.random() * 4);
    element.style.backgroundColor = monoColorPalette[x];
  },
  mondrianColor: function (element) {
    const x = Math.floor(Math.random() * 5);
    element.style.backgroundColor = mondrianColorPalette[x];
  },
};

const transitColorPalette = ["black", "yellow", "cyan", "magenta"];

const monoColorPalette = ["black", "grey", "lightgrey", "white"];

const mondrianColorPalette = ["black", "white", "red", "yellow", "blue"];

const palettes = ["random", "transit", "mono", "mondrian"];

populateSelect();
