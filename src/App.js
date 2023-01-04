import React, { useState } from "react";

import Wrapper from "./components/wrapper.jsx";
import Screen from "./components/screen.jsx";
import ButtonBox from "./components/button-box.jsx";
import Button from "./components/button.jsx";
import ThemeToggle from "./components/theme-toggle.jsx";
import Container from "./components/container.jsx";


const buttonValues = [
  [7, 8, 9, 'DEL'],
  [4, 5, 6, '+'],
  [1, 2, 3, '-'],
  ['.', 0, '/', 'x'],
  ['RESET', '=']
];

const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "x"
          ? a * b
          : a / b;


const App = () => {
  let [calc, setCalc] = useState({
    sign: '',
    number: 0,
    result: 0,
  });

  const equalsHandleClick = () => {
    if (calc.sign && calc.number) {

      setCalc({
        ...calc,
        result:
          calc.number === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.result), Number(calc.number), calc.sign),
        sign: "",
        number: 0,
      });
    }
  };

  const resetHandleClick = () => {
    setCalc({
      ...calc,
      sign: "",
      number: 0,
      result: 0,
    });
  };

  const deleteHandleClick = () => {

    setCalc({
      ...calc,
      number: calc.number.toString().length > 0 ? parseInt(calc.number.toString().slice(0,-1)) : calc.number
    });
  };

  const signHandleClick = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      result: calc.number === "0" && calc.sign === "/" ? "Can't divide with 0"
              : calc.result && calc.number ? math(Number(calc.result), Number(calc.number), calc.sign)
              : calc.result = calc.number,
      number: 0,
    });
  };

  const decimalHandleClick = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;
    console.log(value)
    setCalc({
      ...calc,
      number: !calc.number.toString().includes(".") ? calc.number + value : calc.number,
    });
  };

  const numberHandleClick = (event) => {
    event.preventDefault();
    const value = event.target.innerHTML;

    if (calc.number.toString().length < 16) {
      setCalc({
        ...calc,
        number:
          calc.number === 0 && value === "0"
            ? "0"
            : calc.number % 1 === 0
            ? Number(calc.number + value)
            : calc.number + value,
        result: !calc.sign ? 0 : calc.result,
      });
    }
  };

  // const keyPressHandle = (event) => {
  //   let key = event.key;
  //   console.log( "You pressed a key: " + key );
  //   if (key === '.') {
  //     decimalHandleClick(event)
  //   }
  // }

  return (
    <Container>
      <ThemeToggle/>
      <Wrapper>
        <Screen value={calc.number ? calc.number : calc.result} />
        <ButtonBox>
          {
            buttonValues.flat().map((button, index) => {
              return (
                <Button
                  key={index}
                  className={button === '=' ? 'equals' : button === 'RESET' ? 'reset' : button === 'DEL' ? 'delete' : ''}
                  value={button}
                  onClick={
                    button === '=' ? equalsHandleClick
                    : button === 'RESET' ? resetHandleClick
                    : button === '+' || button === '-' || button === '/' || button === 'x' ? signHandleClick
                    : button === 'DEL' ? deleteHandleClick
                    : button === '.' ? decimalHandleClick
                    : numberHandleClick
                  }
                />
              )
            })
          }
        </ButtonBox>
      </Wrapper>
    </Container>
  );
};

export default App;
