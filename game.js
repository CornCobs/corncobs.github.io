const arrow = document.getElementById("next-arrow");

function reset_animation() {
  arrow.style.animation = 'none';
  arrow.offsetHeight; /* trigger reflow */
  arrow.style.animation = null;
}

const geo = navigator.geolocation;

const lat = document.getElementById("lat");
const lng = document.getElementById("lng");

function check_location(expected, success, failure) {
  geo.getCurrentPosition(pos => {
    const distance = turf.distance(expected, turf.point([pos.coords.longitude, pos.coords.latitude]));
    if (distance < 0.01) {
      success();
    } else {
      failure();
      document.querySelector("h3").innerText = `distance: ${distance}`
    }
    // success();
  }, failure);
}

function flash_arrow() {
  console.log(arrow.className);
  if (arrow.className === "blink") {
    reset_animation();
  } else {
    arrow.classList.add("blink");
  }
}

function setLoading(btn) {
  btn.classList.add("loading");
  btn.innerText = "Loading...";
}

function setPass(btn) {
  btn.classList.remove("loading");
  btn.classList.add("pass");
  btn.innerText = "Proceed!";
}

function resetBtn(btn) {
  btn.classList.remove("loading");
  btn.innerText = "I'm here";
}


const stage1Btn = document.getElementById("stage-1-button");

const stage2 = document.getElementById("stage-2");

const STAGE_1_LOCATION = turf.point([103.81391, 1.32519]);

stage1Btn.onclick = () => {
  if (stage1Btn.innerText === "I'm here") {
    setLoading(stage1Btn);

    const expected = turf.point([Number(lng.value), Number(lat.value)]);

    check_location(expected, () => {
      setPass(stage1Btn);
      flash_arrow();
      stage2.style.display = "block";
    }, () => {
      resetBtn(stage1Btn);
    })
  }
}