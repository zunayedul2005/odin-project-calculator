# Calculator

A simple web-based calculator built as part of [The Odin Project](https://www.theodinproject.com/) JavaScript curriculum.

The project focuses on practising JavaScript fundamentals, DOM manipulation, event listeners, functions, variables, conditional logic, and working with user input.

## Features

* Addition, subtraction, multiplication and division
* Chaining calculations, such as `99 + 1 - 20`
* Decimal number input
* Prevents multiple decimal points in the same number
* Clear (`AC`) button
* Delete (`DEL`) / backspace functionality
* Handles division by zero without crashing
* Rounds long decimal results to prevent display overflow
* Supports keyboard input

  * Numbers `0-9`
  * Operators `+`, `-`, `*`, `/`
  * `Enter` for equals
  * `Backspace` / `Delete` for delete
  * `Escape` for clear
  * `.` for decimal input
  * `=` for equals

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Bootstrap 5

## How It Works

The calculator stores the current calculation using three main variables:

```javascript
let firstValue = "";
let secondValue = "";
let operator = "";
```

Two additional state variables are used to control the calculator's behaviour:

```javascript
let waitingForSecondValue = false;
let resultDisplayed = false;
```

### Calculator State

`firstValue` stores the first number entered.

`secondValue` stores the second number entered.

`operator` stores the selected mathematical operator.

`waitingForSecondValue` keeps track of whether the calculator is currently waiting for the second number.

`resultDisplayed` keeps track of whether a completed calculation is currently being displayed.

For example, after entering:

```text
12 + 7
```

the internal state is approximately:

```javascript
firstValue = "12";
secondValue = "7";
operator = "+";
waitingForSecondValue = true;
```

When `=` is pressed, these values are passed to the `operate()` function.

## Mathematical Operations

The calculator uses separate functions for each basic operation:

```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero";
    }

    return a / b;
}
```

These are controlled through an `operate()` function, which determines which operation should be performed based on the selected operator.

## DOM Manipulation

The calculator interacts with the HTML using JavaScript's DOM APIs.

For example:

```javascript
let currentScreen =
    document.querySelector(".display .current");
```

The calculator then updates the display using:

```javascript
currentScreen.textContent = firstValue;
```

The project also uses event listeners to respond to user interactions with the calculator buttons.

## Chained Calculations

The calculator supports calculations such as:

```text
12 + 7 - 1 =
```

When the second operator is pressed, the calculator first evaluates the existing pair:

```text
12 + 7
```

giving:

```text
19
```

It then uses that result as the first value for the next operation:

```text
19 - 1
```

This allows multiple operations to be chained without evaluating more than one pair of numbers at a time.

## Keyboard Support

Keyboard support is implemented using the `keydown` event:

```javascript
document.addEventListener("keydown", (event) => {
    // keyboard logic
});
```

Instead of duplicating the calculator's existing logic for keyboard input, keyboard presses are mapped to the corresponding calculator buttons.

For example, pressing `7` on the keyboard finds the `7` button and programmatically triggers its click event:

```javascript
matchingButton?.click();
```

This means both mouse input and keyboard input ultimately use the same calculator logic.

Special keyboard keys are also mapped to calculator controls:

| Keyboard Key | Calculator Action |
| ------------ | ----------------- |
| `0-9`        | Number input      |
| `+ - * /`    | Operators         |
| `.`          | Decimal           |
| `Enter`      | Equals            |
| `=`          | Equals            |
| `Backspace`  | Delete            |
| `Delete`     | Delete            |
| `Escape`     | Clear             |

## What I Practised

This project helped me practise:

* Variables and data types
* Functions and return values
* Conditional statements
* `switch` statements
* Ternary operators
* Event listeners
* DOM selection and manipulation
* `querySelector()` and `querySelectorAll()`
* NodeLists and arrays
* Array methods such as `find()` and `forEach()`
* Optional chaining (`?.`)
* Keyboard events and `event.key`
* String methods such as `slice()`
* Template literals
* Managing application state
* Debugging JavaScript logic and edge cases

## Future Improvements

Possible future improvements include:

* Improving the calculator's visual design
* Adding calculation history
* Adding percentage functionality
* Adding positive/negative (`+/-`) functionality
* Improving mobile responsiveness
* Adding more advanced mathematical operations

## Credits

Built as part of **The Odin Project** Foundations curriculum.
