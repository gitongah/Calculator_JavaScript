//calculator object
const calculator={
  displayValue:'0',
  firstNumber:null,
  waitingForSecondOperand: false,
  operator: null,
};
function inputDigit(digit){
  const{displayValue, waitingForSecondOperand}=calculator;

  if(waitingForSecondOperand===true){
    calculator.displayValue=digit;
    calculator.waitingForSecondOperand=false;
  } else {
    calculator.displayValue=displayValue==='0' ? digit: displayValue + digit;
  }
}

function inputDecimal(dot){
  if(calculator.waitingForSecondOperand===true){
    calculator.displayValue='0.'
    calculator.waitingForSecondOperand=false;
    return
  }
  if(!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator){
  const{ firstNumber, displayValue,operator}=calculator;
  const inputValue=parseFloat(displayValue);

  if(operator && calculator.waitingForSecondOperand){
    calculator.operator=nextOperator;
    return;
  }
  if(firstNumber==null && !isNaN(inputValue)){
    calculator.firstNumber=inputValue;
  } 
  else if(operator){
    const result = calculate(firstNumber,inputValue, operator);
    calculator.displayValue=`${parseFloat(result.toFixed(7))}`
    calculator.firstNumber=result;
  }
  calculator.waitingForSecondOperand=true;
  calculator.operator=nextOperator;
}

function calculate(firstNumber, secondNumber, operator){
  
  if(operator==='+'){
    return firstNumber +secondNumber;
  }
  else if(operator==='-'){
    return firstNumber- secondNumber;
  }
  else if(operator==='*'){
    return firstNumber*secondNumber;
  }
  else if(operator==='/'){
    return firstNumber/secondNumber;
  }

  return secondNumber;
}

function resetCalculator(){
  calculator.displayValue='0';
  calculator.firstNumber=null;
  calculator.waitingForSecondOperand=false;
  calculator.operator=null;
}

function updateDispaly(){
  const display=document.querySelector('.calculator-screen');
  display.value=calculator.displayValue;
}
updateDispaly();

function delValue() {
  const{displayValue}=calculator;
  calculator.displayValue = displayValue.substring(0, displayValue.length - 1);
}


const keys=document.querySelector('.calculator-keys');
keys.addEventListener('click',(event) =>{
  // Access the clicked element
  const{target}=event;
  const{value}=target;
  if(!target.matches('button')){
    return
  }
  switch(value){
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      resetCalculator();
      break;
    case 'Del':
      delValue();
      break;
    default:
      if(Number.isInteger(parseFloat(value))){
        inputDigit(value)
      }
  }
  updateDispaly();
});
