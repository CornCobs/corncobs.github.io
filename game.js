const arrow = document.getElementById("next-arrow");
const wrong = document.getElementById("wrong");

function reset_animation(elem) {
  elem.style.animation = 'none';
  elem.offsetHeight; /* trigger reflow */
  elem.style.animation = null;
}

const geo = navigator.geolocation;

function check_location(expected, success, failure) {
  geo.getCurrentPosition(pos => {
    const distance = turf.distance(expected, turf.point([pos.coords.longitude, pos.coords.latitude]));
    if (distance < 0.02) {
      success();
    } else {
      failure();
      // document.querySelector("h3").innerText = `distance: ${(distance * 1000).toFixed(1)}m`
    }
    // success();
  }, failure);
}

function flash(elem) {
  if (elem.className === "blink") {
    reset_animation(elem);
  } else {
    elem.classList.add("blink");
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


const stage0Btn = document.getElementById("stage-0-button");
const stage1Btn = document.getElementById("stage-1-button");
const stage2Btn = document.getElementById("stage-2-button");
const stage3Btn = document.getElementById("stage-3-button");
const stage4Btn = document.getElementById("stage-4-button");

const stage1 = document.getElementById("stage-1");
const stage2 = document.getElementById("stage-2");
const stage3 = document.getElementById("stage-3");
const stage4 = document.getElementById("stage-4");

const STAGE_1_LOCATION = turf.point([103.9126006, 1.3044146]);
const STAGE_2_LOCATION = turf.point([103.9120058, 1.3037415]);
const STAGE_3_LOCATION = turf.point([103.9121587, 1.303131]);
const STAGE_4_LOCATION = turf.point([103.9128114, 1.3028116]);



// let STAGE_1_LOCATION;
// let STAGE_2_LOCATION;
// let STAGE_3_LOCATION;
// let STAGE_4_LOCATION;

// geo.getCurrentPosition(pos => {
//   const pt = turf.point([pos.coords.longitude, pos.coords.latitude]);
//   STAGE_1_LOCATION = pt;
//   STAGE_2_LOCATION = pt;
//   STAGE_3_LOCATION = pt;
//   STAGE_4_LOCATION = pt;
// })

stage0Btn.onclick = () => {
  if (stage0Btn.innerText === "Begin") {
    setPass(stage0Btn);
    flash(arrow);
    stage1.style.display = "flex";
  }
}

stage1Btn.onclick = () => {
  if (stage1Btn.innerText === "I'm here") {
    setLoading(stage1Btn);
    const expected = STAGE_1_LOCATION;
    check_location(expected, () => {
      setPass(stage1Btn);
      flash(arrow);
      stage2.style.display = "flex";
    }, () => {
      flash(wrong);
      resetBtn(stage1Btn);
    })
  }
}

stage2Btn.onclick = () => {
  if (stage2Btn.innerText === "I'm here") {
    setLoading(stage2Btn);
    const expected = STAGE_2_LOCATION;
    check_location(expected, () => {
      setPass(stage2Btn);
      flash(arrow);
      stage3.style.display = "flex";
    }, () => {
      flash(wrong);
      resetBtn(stage2Btn);
    })
  }
}

stage3Btn.onclick = () => {
  if (stage3Btn.innerText === "I'm here") {
    setLoading(stage3Btn);
    const expected = STAGE_3_LOCATION;
    check_location(expected, () => {
      setPass(stage3Btn);
      flash(arrow);
      stage4.style.display = "flex";
    }, () => {
      flash(wrong);
      resetBtn(stage3Btn);
    })
  }
}