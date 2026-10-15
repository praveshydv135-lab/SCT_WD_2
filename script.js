const currentOperandElement = document.getElementById('current-operand');
const previousOperandElement = document.getElementById('previous-operand');
const equalButton = document.getElementById('equal-btn');

let currentOperand = '0';
let previousOperand = '';
let operation = null;
let resetDisplay = false;

// Append digit or decimal
function appendNumber(number) {
  if (currentOperand === 'Error') clearDisplay();
  if (resetDisplay) {
    currentOperand = '';
    resetDisplay = false;
  }
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number;
  } else {
    currentOperand += number;
  }
  updateDisplay();
}

// Set arithmetic operator
function appendOperator(op) {
  if (currentOperand === 'Error') return;
  if (currentOperand === '' && op !== '-') return;
  
  if (previousOperand !== '') {
    calculate();
  }

  operation = op;
  previousOperand = `${currentOperand} ${getDisplaySymbol(op)}`;
  currentOperand = '';
  updateDisplay();
}

// Convert inner operators to readable symbols
function getDisplaySymbol(op) {
  if (op === '*') return '×';
  if (op === '/') return '÷';
  return op;
}

// Calculate the result
function calculate() {
  if (!operation || currentOperand === '') return;

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  let result;
  try {
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        // Error handling for division by zero
        if (current === 0) {
          throw new Error('Division by zero');
        }
        result = prev / current;
        break;
      case '%':
        result = prev % current;
        break;
      default:
        return;
    }

    currentOperand = Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
    previousOperand = '';
    operation = null;
    resetDisplay = true;
  } catch (error) {
    currentOperand = 'Error';
    previousOperand = '';
    operation = null;
    resetDisplay = true;
  }

  updateDisplay();
}

// Clear all inputs
function clearDisplay() {
  currentOperand = '0';
  previousOperand = '';
  operation = null;
  resetDisplay = false;
  updateDisplay();
}

// Delete last digit
function deleteNumber() {
  if (currentOperand === 'Error' || resetDisplay) {
    clearDisplay();
    return;
  }
  if (currentOperand.length === 1) {
    currentOperand = '0';
  } else {
    currentOperand = currentOperand.slice(0, -1);
  }
  updateDisplay();
}

// Update DOM elements
function updateDisplay() {
  currentOperandElement.innerText = currentOperand;
  previousOperandElement.innerText = previousOperand;
}

// Event listener on Equal Button
equalButton.addEventListener('click', calculate);

// Keyboard Input Handling
window.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendNumber(e.key);
  } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
    appendOperator(e.key);
  } else if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    calculate();
  } else if (e.key === 'Backspace') {
    deleteNumber();
  } else if (e.key === 'Escape') {
    clearDisplay();
  }
});
