let ActionButtons = document.querySelectorAll(".action");
let InstantActionButtons = document.querySelectorAll(".instantaction");
let NumberButtons = document.querySelectorAll(".number");

let ClearAllButton = document.querySelector(".clearAll");
let UndoButton = document.querySelector(".undo");
let ResultButton = document.querySelector(".result");
let commaButton = document.querySelector(".comma")

let HistoryView = document.querySelector(".history");
let MainView = document.querySelector(".main");

let ThemeButton = document.querySelector(".toggletheme")

const root = document.documentElement;

// root.classList.toggle("light");
ThemeButton.onclick = () => {
  root.classList.toggle("light");
  if (ThemeButton.innerHTML === "Change theme to light") {
    ThemeButton.innerHTML = "Change theme to dark";
  } else {
    ThemeButton.innerHTML = "Change theme to light";
  }
}

let PrevAction = "";
let CurrentAction = "";
let PrevVal = "";
let NewVal = "";

let sequence = [];

ClearAllButton.addEventListener("click", () => {
  sequence = [];
  PrevAction = "";
  CurrentAction = "";
  PrevVal = "";
  NewVal = "";
  UpdateView();
});

commaButton.addEventListener("click", () => {
  if (!toString(NewVal).includes(".")) {
    NewVal += ".";
    console.log("yes");
    UpdateView();
  }

});

UndoButton.addEventListener("click", () => {
  NewVal = Math.floor(NewVal / 10);

  UpdateView();
});


ResultButton.addEventListener("click", () => {
  if (sequence[sequence.length - 1] == "=") {
    sequence = sequence.slice(0, -1);
    let index = 0;
    for (let i = 0; i < sequence.length; i++) {
      if ("/*-×+%".includes(sequence[i])) {
        break;
      }
      index++;
    }

    let sliced = sequence.slice(index)
    sequence = [NewVal, ...sliced];
    NewVal = "";
  }

  EvaluateResult();

});


for (button of NumberButtons) {
  button.addEventListener("click", (e) => {
    let num = e.target.id;

    if (sequence[sequence.length - 1] == "=")
      sequence = [];

    if (NewVal.length > 0) {
      NewVal += num;
    } else {
      NewVal = num;
    }

    if (num == "pi") {
      NewVal = +Math.PI.toPrecision(5);
    }

    PrevVal = NewVal;

    UpdateView();
  });
}


for (button of InstantActionButtons) {
  button.addEventListener("click", (e) => {
    let action = e.target.id;

    if (NewVal != "0") {
      switch (action) {
        case "rad":
          NewVal = degreesToRadians(NewVal);
          NewVal = +NewVal.toPrecision(10)
          EvaluateResult();
          break;
        case "sin":
          NewVal = Math.sin(degreesToRadians(NewVal));
          NewVal = +NewVal.toPrecision(10)
          EvaluateResult();
          break;
        case "cos":
          NewVal = Math.cos(degreesToRadians(NewVal));
          NewVal = +NewVal.toPrecision(10)
          EvaluateResult();
          break;
        case "tan":
          NewVal = Math.tan(degreesToRadians(NewVal));
          NewVal = +NewVal.toPrecision(10)
          EvaluateResult();
          break;
        case "√":
          if (parseFloat(NewVal) < 0) {
            DisplayError("Root of a negative number")
            break
          }
          NewVal = Math.sqrt(NewVal, 2)
          EvaluateResult();
          break;
        case "!":
          if ((NewVal + "").includes('.')) {
            DisplayError("no decimals please (infinite recursion)")
            break
          }

          NewVal = factorialize(NewVal);
          EvaluateResult();
          break;
        case "1/":
          NewVal = 1 / NewVal;
          EvaluateResult();
          break;
        case "lg":
          if(NewVal < 0)
          {
            DisplayError("Log10 of negative value")
            return
          }
          NewVal = Math.log10(NewVal);
          EvaluateResult();
          break;
        case "ln":
          NewVal = Math.log(NewVal);
          NewVal = +NewVal.toPrecision(10);
          EvaluateResult();
          break;
        case "+/-":
          NewVal = parseFloat(NewVal) * -1;
          UpdateView();
          break;
      }
    }
  });
}

for (button of ActionButtons) {
  button.addEventListener("click", (e) => {
    let action = e.target.id;

    if (!Number.isInteger(sequence[sequence.length - 1]) || NewVal.length > 0) {
      EvaluateResult();
      sequence = [NewVal, action];
      UpdateView();

      NewVal = "";
      console.log(1);
    }
    else {
      sequence.push(...sequence.slice(0, -1), action)
      console.log(5);
      UpdateView();
    }

    PrevAction = CurrentAction;
    CurrentAction = action;
  });
}

function factorialize(num) {
  if (num < 0)
    return -1;
  else if (num == 0)
    return 1;
  else {
    return (num * factorialize(num - 1));
  }
}

function degreesToRadians(deg) {
  return radians = (Math.PI / 180) * deg;
}

function UpdateView() {
  HistoryView.textContent = sequence.join('');

  MainView.textContent = NewVal;
}

function is_numeric(str) {
  return /^\d+$/.test(str);
}

function DisplayError(message) {
  sequence = [];
  NewVal = "";
  HistoryView.textContent = "Error occured:"
  MainView.textContent = message;
  console.warn("Math error");
}

function EvaluateResult() {

  let val1 = null;
  let val2 = null;
  let symbol = "";

  if (NewVal != "" && sequence[sequence.length - 1] != "=")
    sequence.push(NewVal)

  for (x of sequence) {

    // converts to string
    let element = x + "";

    number = parseFloat(x);

    let isNumber = is_numeric(number);

    if (Number.isInteger(parseFloat(element.replace('.', ',')))) {
      isNumber = true;
    }

    if (isNumber && symbol == "") { // first num
      val1 = number;

    } else if (isNumber && symbol != "") { //second num
      val2 = number;

    } else { // symbol
      symbol = x;
    }
  }

  switch (symbol) {
    case "+":
      NewVal = val1 + val2;
      break;
    case "-":
      NewVal = val1 - val2;
      break;
    case "×":
      if (val2 == 0 || val2 == null)
        val2 = 1;
      NewVal = val1 * val2;
      break;
    case "÷":
      if (val2 == 0 || val2 == null)
        val2 = 1;
      NewVal = val1 / val2;
      NewVal = +NewVal.toPrecision(10)
      break;
    case "%":
      if (val2 == 0 || val2 == null)
        val2 == 1;
      NewVal = val1 % val2;
      NewVal = +NewVal.toPrecision(10)
      break;
    case "^":
      NewVal = Math.pow(val1, val2)
      break;
    case "√":

      if(val2 < 0)
      {
        DisplayError("Root of a negative number");
        return;
      }

      NewVal = Math.pow(val2, 1 / val1);

      if(val1 % 2 == 0)
      NewVal *= -1;

      break;

  }
  NewVal = NewVal + "";

  if (sequence[sequence.length - 1] != "=")
    sequence.push("=");
  UpdateView();

  return NewVal;
}

