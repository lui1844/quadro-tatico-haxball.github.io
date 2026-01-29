const field = document.getElementById("field");
const modeSelect = document.getElementById("mode");
const playersSelect = document.getElementById("players");
const resetBtn = document.getElementById("reset");
const ball = document.getElementById("ball");

function setMode() {
  field.className = "";
  ball.className = "";

  if (modeSelect.value === "futsal") {
    field.classList.add("futsal");
    ball.classList.add("ball-futsal");
  } else {
    field.classList.add("real");
    ball.classList.add("ball-real");
  }

  ball.style.left = "495px";
  ball.style.top = "245px";
}

function createPlayers() {
  document.querySelectorAll(".player").forEach(p => p.remove());

  const total = parseInt(playersSelect.value);
  for (let i = 0; i < total; i++) {
    addPlayer("red", 100, 50 + i * 30);
    addPlayer("blue", 860, 50 + i * 30);
  }
}

function addPlayer(color, x, y) {
  const p = document.createElement("div");
  p.className = `player ${color}`;
  p.style.left = x + "px";
  p.style.top = y + "px";
  makeDraggable(p);
  field.appendChild(p);
}

function makeDraggable(el) {
  el.onmousedown = e => {
    const shiftX = e.clientX - el.getBoundingClientRect().left;
    const shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(x, y) {
      el.style.left = x - shiftX - field.offsetLeft + "px";
      el.style.top = y - shiftY - field.offsetTop + "px";
    }

    function onMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener("mousemove", onMove);
    document.onmouseup = () => {
      document.removeEventListener("mousemove", onMove);
      document.onmouseup = null;
    };
  };
}

makeDraggable(ball);

modeSelect.onchange = () => {
  setMode();
};

playersSelect.onchange = createPlayers;

resetBtn.onclick = () => {
  setMode();
  createPlayers();
};

setMode();
createPlayers();
