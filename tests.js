test("Addition",["2.2", "+", "5"], 7.2)
test("Subtraction",["2.2", "-", "5"], -2.8)
test("Multiplication",["2.2", "×", "5"], 11)
test("Division",["10", "÷", "5"], 2)
test("Mod Division",["1235", "%", "10"], 5)

test("Commas",["2.22", "×", "5.123"], 11.37306)

console.log();

test("Addition 2",["-2.122", "+", "5020"], 5017.878)
test("Subtraction 2",["-50.555", "-", "150"], -200.555)
test("Multiplication 2",["789.50", "×", "0.123"], 97.1085)
test("Division 2",["500.999", "÷", "2.3"], 217.825652174)
test("Mod Division 2",["789.654", "%", "321"], 147.654 )

console.log();
test("Addition3",["999999", "+", "9999999999.9"], 10000999998.9)
test("Subtraction 3",["999999", "-", "9999999999.9"], -9999000000.9)
test("Multiplication 3",["999999", "×", "9999999999"], 9999989999000001)
test("Division 3",["999999", "÷", "9999999999"], 0.0000999999)
test("Mod Division 3",["999999", "%", "9999999999"], 999999 )

ClearAllButton.click();

function test(name,seq, expected) {
  NewVal = "";
  sequence = seq;

  result = EvaluateResult();

  if (result == expected)
    console.log(name + " SUCCESS. " + sequence + result);
  else
    console.warn(name + " FAIL. expected: " + expected + ". Got: " + result);
}