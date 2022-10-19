
let ActionButtons = document.querySelectorAll(".action");

let NumberButtons = document.querySelectorAll(".number");

let ClearAllButton = document.querySelector(".clearAll");
let UndoButton = document.querySelector(".undo");
let ResultButton = document.querySelector(".result");

let historyView = document.querySelector(".history");
let mainView = document.querySelector(".main");

//console.log(ActionButtons);
//console.log(NumberButtons);

//console.log(ClearAllButton);
//console.log(UndoButton);

let prevAction = "";
let currentAction = "";
let prevVal = "";
let newVal = "";

//  TODO: calculate value 33+66-663 99show on main, dissapear on type DONE
//  TODO: make sequence an array, store values like [-12,+,12] DONE
// ! Daugybos su neigiamais nera
// ! Commas dont work - make separate class
// ! +/- doesnt work  - make separate class
// ! grey buttons dont work
let sequence = [];

ClearAllButton.addEventListener("click", () => {
  sequence = [];
  prevAction = "";
  currentAction = "";
  prevVal = "";
  newVal = "";
  UpdateView();
});

UndoButton.addEventListener("click", () => {
  newVal = Math.floor(newVal / 10);

  UpdateView();
});


ResultButton.addEventListener("click", () => {
  if (sequence[sequence.length - 1] == "=") {
    sequence = sequence.slice(0, -1);
    console.log("Result sequence: " + sequence);
    let index = 0;
    for (let i = 0; i < sequence.length; i++) {
      if (!is_numeric(sequence[i]) && !Number.isInteger(sequence[i])) {
        break;
      }
      index++;
    }

    // sequence = newVal + sequence.slice(index)
    let sliced = sequence.slice(index)
    sequence = [newVal, ...sliced];
    newVal = "";
    console.log(sequence);
  }

  EvaluateResult();

  UpdateView();
});


for (button of NumberButtons) {
  button.addEventListener("click", (e) => {
    let num = e.target.id;

    if (newVal[0] == "0") newVal = newVal.slice(1, -1);

    if (Number.isInteger(sequence[sequence.length - 1]) || newVal.length > 0) {
      newVal += num;
    } else {
      newVal = num;
    }

    prevVal = newVal;

    UpdateView();
  });
}

for (button of ActionButtons) {
  button.addEventListener("click", (e) => {
    let action = e.target.id;

    if (!Number.isInteger(sequence[sequence.length - 1]) || newVal.length > 0) {
      EvaluateResult();
      sequence = [newVal, action];
      UpdateView();

      newVal = "";
      console.log(1);
    } else if (sequence[sequence.length - 1] == "=") {
      sequence = [newVal, action];
      console.log(2);
      UpdateView();

    } else if (!Number.isInteger(sequence[sequence.length - 1])) {
      EvaluateResult();
      console.log(3);
      UpdateView();

    } else if (sequence.length == 0) {
      sequence.push(0, action)
      console.log(4);
      UpdateView();
    }
    else {
      sequence.push(...sequence.slice(0, -1), action)
      console.log(5);
      UpdateView();

    }

    prevAction = currentAction;
    currentAction = action;
  });
}

function UpdateView() {
  historyView.textContent = sequence.join('');

  mainView.textContent = newVal;
}

function is_numeric(str) {
  return /^\d+$/.test(str);
}

function EvaluateResult() {
  console.log("----------------Evaluation--------");
  let val1 = 0;
  let val2 = 0;
  let symbol = "";

  if (newVal != "")
    sequence.push(newVal)
  console.log(sequence);

  for (x of sequence) {
    console.log(x + ":");

    let isNumber = is_numeric(x);

    if (Number.isInteger(x)) {
      isNumber = true;
    }

    if (isNumber && symbol == "") { // first num
      if (val1 == 0) val1 = Number(x);
      else {
        val1 = val1 * 10 + Number(x);
      }
      console.log("val1:" + val1);
    } else if (isNumber && symbol != "") { //second num
      if (val2 == 0) val2 = Number(x);
      else {
        val2 = val2 * 10 + Number(x);
      }
      console.log("val2:" + val2);
    } else { // symbol
      symbol = x;
      console.log("symbol:" + symbol);
    }
  }

  symbols = [];

  for (x of sequence) {
    if (x == "-" || x == "+") {
      symbols.push(x);
    }
  }

  switch (symbol) {
    case "+":
      newVal = val1 + val2;
      break;
    case "-":
      newVal = val1 - val2;
      break;
    case "×":
      if (val2 == 0)
        val2 = 1;
      newVal = val1 * val2;
      break;
    case "÷":
      if (val2 == 0)
        val2 = 1;
      newVal = val1 / val2;
      newVal = +newVal.toFixed(10)
      break;
    case "%":
      if (val2 == 0)
        val2 == 1;
      newVal = val1 % val2;
      newVal = +newVal.toFixed(10)
      break;
    case "sin":
      console.log(degreesToRadians(val1) + "<<<");
      newVal = degreesToRadians(val1)
      newVal = Math.sin(newVal);
      break;
    case "cos":
      console.log(degreesToRadians(val1) + "<<<");
      newVal = Math.cos(degreesToRadians(val1));
      break;
    case "tan":
      console.log(degreesToRadians(val1) + "<<<");
      newVal = Math.tan(degreesToRadians(val1));
      break;
  }
  console.log("newVal:" + newVal);

  console.log("Ends with num: " + is_numeric(sequence[sequence.length - 1]));

  if (is_numeric(sequence[sequence.length - 1])) {
    sequence.push("=");
  }
  UpdateView();
}

function degreesToRadians(degrees)
{
  return degrees * (Math.PI/180);
}

console.log(NumberButtons);
console.log(ActionButtons);

document.addEventListener('keydown', e => {

  if ((e.key >= 0 && e.key <= 9)) {
    // 0-9 only
    switch (e.key) {
      case "0":
        NumberButtons[9].click()
        break;

      case "1":
        NumberButtons[6].click()
        break;

      case "2":
        NumberButtons[7].click()
        break;
      case "3":
        NumberButtons[8].click()
        break;

      case "4":
        NumberButtons[3].click()
        break;

      case "5":
        NumberButtons[4].click()
        break;

      case "6":
        NumberButtons[5].click()
        break;

      case "7":
        NumberButtons[0].click()
        break;

      case "8":
        NumberButtons[1].click()
        break;
      case "9":
        NumberButtons[2].click()
        break;

    }
  }
  else {
    switch (e.key) {
      case "Delete":
        ClearAllButton.click();
        break;
      case "Backspace":
        UndoButton.click();
        break;
      case "/":
        ActionButtons[16].click();
        break;
      case "*":
        ActionButtons[17].click();
        break;
      case "-":
        ActionButtons[18].click();
        break;
      case "+":
        ActionButtons[19].click();
        break;
      case "," || ".":
        ActionButtons[21].click();
        break;
      case "Enter":
        ResultButton.click();
        break;
    }
  }

})