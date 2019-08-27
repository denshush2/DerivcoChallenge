/**
 * Function for get three symbols
 * @param {Array}reels
 * @param {String/ArrayOFStrings} symbol
 * @returns {Array}
 *  */

function getThreeSymbols(reels, symbol) {
  if (typeof symbol === "string") {
    let count = 0;
    count = reels.map(item => {
      if (item.includes(symbol)) {
        return [true, item.indexOf(symbol) + 1];
      }
      return false;
    });
    if (count[0][0] && count[1][0] && count[2][0]) {
      return [true, [count[0][1], count[1][1], count[2][1]]];
    }
    return false;
  } else {
    let count = 0;
    count = reels.map(item => {
      if (item.includes(symbol[0])) {
        return [true, item.indexOf(symbol[0]) + 1];
      }
      if (item.includes(symbol[1])) {
        return [true, item.indexOf(symbol[1]) + 1];
      }
      if (item.includes(symbol[2])) {
        return [true, item.indexOf(symbol[2]) + 1];
      }
      return false;
    });
    if (count[0][0] && count[1][0] && count[2][0]) {
      return [true, [count[0][1], count[1][1], count[2][1]]];
    }
    return false;
  }
}

/**
 *
 * @param {Array} reels
 * @returns {Object} {msg, value, redLines}
 */
export function checkResult(reels) {
  // 3 CHERRY symbols on top line 2000
  if (reels.length === 3) {
    console.log("Reels", reels);
    if (
      reels[0][0] === reels[1][0] &&
      reels[2][0] === reels[1][0] &&
      reels[0][0] === "cherry"
    ) {
      console.log(reels[0][0]);
      return {
        msg: "3 CHERRY symbols on top line, won 2000",
        value: 2000,
        redlines: [1, 1, 1]
      };
    }
    //3 CHERRY symbols on center line 1000
    if (
      reels[0][1] === reels[1][1] &&
      reels[2][1] === reels[1][1] &&
      reels[0][1] === "cherry"
    ) {
      return {
        msg: "3 CHERRY symbols on center line, won 1000",
        value: 1000,
        redlines: [2, 2, 2]
      };
    }
    //3 CHERRY symbols on bottom line 4000
    if (
      reels[0][2] === reels[1][2] &&
      reels[2][2] === reels[1][2] &&
      reels[0][2] === "cherry"
    ) {
      return {
        msg: "3 CHERRY symbols on bottom line, won 4000",
        value: 4000,
        redlines: [3, 3, 3]
      };
    }
    //3 7 symbols on any line 150
    let seven = getThreeSymbols(reels, "seven");
    if (seven[0]) {
      return {
        msg: "3 7 symbols on any line, won 150",
        value: 150,
        redlines: seven[1]
      };
    }
    //Any combination of CHERRY and 7 on any line 75
    let anySevenAndCherry = getThreeSymbols(reels, ["seven", "cherry"]);
    if (anySevenAndCherry[0]) {
      return {
        msg: "Any combination of CHERRY and 7 on any line 75",
        value: 75,
        redlines: anySevenAndCherry[1]
      };
    }
    //3 3xBAR symbols on any line 50
    let trippleBar = getThreeSymbols(reels, "trippleBar");
    if (trippleBar[0]) {
      return {
        msg: "3 3xBAR symbols on any line, won 150",
        value: 150,
        redlines: trippleBar[1]
      };
    }
    //3 2xBAR symbols on any line 20
    let doubleBar = getThreeSymbols(reels, "dobleBar");
    if (doubleBar[0]) {
      return {
        msg: "3 2xBAR symbols on any line, won 20",
        value: 20,
        redlines: doubleBar[1]
      };
    }
    let bar = getThreeSymbols(reels, "bar");
    //3 BAR symbols on any line 10
    if (bar[0]) {
      return {
        msg: "3 BAR symbols on any line, won 10",
        value: 10,
        redlines: bar[1]
      };
    }
    //Combination of any BAR symbols on any line 10
    let anyBar = getThreeSymbols(reels, ["trippleBar", "bar", "dobleBar"]);
    if (anyBar[0]) {
      return {
        msg: "Combination of any BAR symbols on any line 10",
        value: 10,
        redlines: anyBar[1]
      };
    }
    return {
      msg: "nothing",
      value: 0,
      redlines: [0, 0, 0]
    };
  }
}
