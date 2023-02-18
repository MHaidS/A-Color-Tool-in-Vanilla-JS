// Hexadecimal string notation ===> Each color component can be represented as a number between 0 and 255 (0x00 and 0xFF) or, optionally, as a number between 0 and 15 (0x0 and 0xF). All components must be specified using the same number of digits. If you use the single-digit notation, the final color is computed by using each component's digit twice; that is, "#D" becomes "#DD" when drawing.
// RGB functional notation ===> RGB (Red/Green/Blue) functional notation, like hexadecimal string notation, represents colors using their red, green, and blue components. The color is defined using the CSS function rgb(). Each must be an <integer> value between 0 and 255 (inclusive), or a <percentage> from 0% to 100%.
const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const sliderText = document.getElementById("sliderText");
const slider = document.getElementById("slider");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

// CLICK EVENT LISTENER TO THE TOGGLE BTN
toggleBtn.addEventListener("click", () => {
  if (toggleBtn.classList.contains("toggled")) {
    // Lighten is highlighted
    toggleBtn.classList.remove("toggled");
    lightenText.classList.remove("unselected");
    darkenText.classList.add("unselected");
  } else {
    // Darken is highlighted
    toggleBtn.classList.add("toggled");
    lightenText.classList.add("unselected");
    darkenText.classList.remove("unselected");
  }
  // call reset in toggleBtn click handler
  reset();
});

// DISPLAY COLOR FR USER HEX INPUT
hexInput.addEventListener("keyup", () => {
  const hex = hexInput.value;
  if (!isValidHex(hex)) return;

  const strippedHex = hex.replace("#", "");

  inputColor.style.backgroundColor = "#" + strippedHex;
  // call reset in hexInput keyup handler
  reset();
});

// CHECK FOR VALID HEX COLOR
const isValidHex = (hex) => {
  if (!hex) return false;

  const strippedHex = hex.replace("#", "");
  return strippedHex.length === 3 || strippedHex.length === 6;
};

// CONVERT HEX COLOR TO RGB
const convertHexToRGB = (hex) => {
  if (!isValidHex(hex)) return null;

  let strippedHex = hex.replace("#", "");

  if (strippedHex.length === 3) {
    strippedHex =
      strippedHex[0] +
      strippedHex[0] +
      strippedHex[1] +
      strippedHex[1] +
      strippedHex[2] +
      strippedHex[2];
  }
  // use parseInt("", 16) to convert a hex value to a decimal value
  const r = parseInt(strippedHex.substring(0, 2), 16);
  const g = parseInt(strippedHex.substring(2, 4), 16);
  const b = parseInt(strippedHex.substring(4, 6), 16);
  // return an object with 3 properties - r,g, and b
  return { r, g, b };
};

// CONVERT RGB TO HEX
const convertRGBToHex = (r, g, b) => {
  //for each (r,g,b) - create a hex pair that is two characters long [regardless of how many characters 'r.toString(16)' returns, '0' will be added at the start & 'slice(-2)' will provide the last 2 characters of the string]
  const firstPair = ("0" + r.toString(16)).slice(-2);
  const secondPair = ("0" + g.toString(16)).slice(-2);
  const thirdPair = ("0" + b.toString(16)).slice(-2);
  //return hex value starting with a hashtag
  const hex = "#" + firstPair + secondPair + thirdPair;
  return hex;
};

// ALTER COLOR BY PERCENTAGE
const alterColor = (hex, percentage) => {
  //convert the hex value to rgb
  const { r, g, b } = convertHexToRGB(hex);
  //increase each r,g,b value by appropriate amount (percentage of 255)
  const amount = Math.floor((percentage / 100) * 255);
  const newR = increaseWithin0To255(r, amount);
  const newG = increaseWithin0To255(g, amount);
  const newB = increaseWithin0To255(b, amount);
  //use the new r,g,b values to convert to a hex value then return the hex value
  return convertRGBToHex(newR, newG, newB);
};

// TO MAKE SURE THAT HEX VALUES STAY BETWEEN 0 & 255
const increaseWithin0To255 = (hex, amount) => {
  // const newHex = hex + amount;
  // if (newHex > 255) return 255;
  // if (newHex < 0) return 0;
  // return newHex;
  return Math.min(255, Math.max(0, hex + amount));
};

// console.log(alterColor("000", 10));
// #191919  ====> '1' is eq to 16, + 9 == 25
alterColor("fff", 10);

// ALTER COLOR BASED ON USER INPUT
slider.addEventListener("input", () => {
  //check if hex is valid
  if (!isValidHex(hexInput.value)) return;
  // display percentage fr slider
  sliderText.textContent = `${slider.value}%`;
  // alter color based on lighten/darken toggle state by computing the appropriate value for the color alteration between pos & neg
  const valueAddition = toggleBtn.classList.contains("toggled")
    ? -slider.value
    : slider.value;
  //get the altered hex value
  const alteredHex = alterColor(hexInput.value, valueAddition);
  //update the altered color
  alteredColor.style.backgroundColor = alteredHex;
  alteredColorText.innerText = `Altered Color ${alteredHex}`;
});

// COLOR RESET FUNCTIONALITY
const reset = () => {
  // set slider value to 0 and slider text to 0%
  slider.value = 0;
  sliderText.innerText = `0%`;
  // set altered color to original input color
  alteredColor.style.backgroundColor = hexInput.value;
  // reset alteredColorText to original input
  alteredColorText.innerText = `Altered Color ${hexInput.value}`;
};
// call reset in toggleBtn click handler
// call reset in hexInput keyup handler
