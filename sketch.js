let t,
  d,
  h,
  m,
  s,
  i,
  e,
  egg = false;
function setup() {
  createCanvas(600, 400);
  let inp = createInput("");
  let col = color("grey");
  inp.style("background-color", col);
  inp.position(150, 150);
  inp.size(300);
  inp.input(onChangeInput);
  e = "";
}

function onChangeInput() {
  i = new Date();
  if (egg) egg = !egg;
  let v = this.value();
  if (!isNaN(v)) {
    const hours = v.substring(0, 2);
    const minutes = v.substring(2, 4);
    if ((hours > 23) | (minutes > 59)) {
      e = "Not a valid zulu time... I'll try to work with it";
    } else e = "";
    i.setUTCHours(hours, minutes);
  } else if (btoa(v) == "ZWdn") {
    egg = true;
  } else i = "";
}

function leadZeros(h, m, s) {
  let z = {};
  z.h = h < 10 ? "0" + h : h;
  z.m = m < 10 ? "0" + m : m;
  z.s = s < 10 ? "0" + s : s;
  return z;
}

function currTimeGlobal() {
  d = new Date();
  let w = leadZeros(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
  h = w.h;
  m = w.m;
  s = w.s;
  t = h + ":" + m + ":" + s + " zulu";
}

function compareTime() {
  if (i !== undefined && !isNaN(i) && i != "") {
    let hdiff = 0,
      mdiff = 0,
      sdiff = 0;
    let diff = Math.round((i.getTime() - d.getTime()) / 1000);
    if (diff < 0) {
      t = "Time is up!";
      return;
    }
    hdiff = Math.floor(diff / 3600);
    diff %= 3600;
    mdiff = Math.floor(diff / 60);
    sdiff = diff % 60;
    let w = leadZeros(hdiff, mdiff, sdiff);
    hdiff = w.h;
    mdiff = w.m;
    sdiff = w.s;
    t = hdiff + ":" + mdiff + ":" + sdiff + " remaining";
    return;
  }
  if (i == "") {
    e = "that doesn't seem like a number, try 2359.";
  } else e = "";
  t = "Set a time.";
}

function draw() {
  currTimeGlobal();
  background(0);
  textSize(42);
  fill(128, 255);
  let title = text("FBW TOD timer", 170, 110);
  textSize(16);
  let txt = text("enter a T/D in zulu (example: 1744) ", 160, 140);
  textSize(32);
  translate(200, 200);
  let ecolor = "red";
  if (!egg) {
    compareTime();
  } else {
    ecolor = "green";
    e = "You found the egg, here's the current time!";
  }
  text(t, -32, 8);
  textSize(8);
  fill(ecolor);
  text(e, -32, 27);
}
