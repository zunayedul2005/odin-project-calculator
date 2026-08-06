// global variables
    let firstValue ="";
    let secondValue="";
    let operator="";
    let waitingForSecondValue=false;
    let resultDisplayed=false;



//store all dom  html elemnts
document.addEventListener("DOMContentLoaded", function() {
    
    let deleteButton = document.querySelector("button.delete");
    let clearButton = document.querySelector("button.clear");
    let equal = document.querySelector("button.equals");    
    let decimal = document.querySelector("button.decimal");
    let numbers = document.querySelectorAll("button.number");
    let operators = document.querySelectorAll("button.operator");
    let previousScreen = document.querySelector(".display .previous");
    let currentScreen = document.querySelector(".display .current");


    function resetIfResultDisplayed() {
        if(resultDisplayed){
            firstValue ="";
            secondValue ="";
            operator ="";
            currentScreen.textContent ="";
            previousScreen.textContent ="";
            resultDisplayed = false;
            waitingForSecondValue = false;
        }
    
    }
    

    //numbers event listener
    numbers.forEach(button => {
        button.addEventListener("click", function() {
            resetIfResultDisplayed();

            if(!waitingForSecondValue){
            
                firstValue = (firstValue =="0") ? button.textContent : firstValue +button.textContent;  
                currentScreen.textContent = firstValue;
            }
        
            else{
                secondValue = (secondValue =="0") ? button.textContent : secondValue +button.textContent;
                currentScreen.textContent = secondValue;
            }
        
        
        });
    });

    //operators event listener
    operators.forEach(button => {
        button.addEventListener("click", () => {
            // FIX (bug 1): resetIfResultDisplayed() removed from here.
            // It was wiping firstValue to "" whenever an operator was
            // pressed right after "=", which made the very next line
            // ("if firstValue === '' return") bail out and swallow the
            // press. An operator after a result should CONTINUE the
            // calculation using that result, not clear it.
            if(firstValue ===""){
                return;
            }
            // FIX (bug 1, continued): clear the flag here instead —
            // we've confirmed we're actively continuing a calculation,
            // not just looking at a static leftover result.
            resultDisplayed = false;
            
            if(secondValue !==""){  // if snd vau isnt empty, and user click an operaotor, immediately calculate the previous equation
                let answer = operate(Number(firstValue), Number(secondValue), operator);
            

            if(typeof answer !== "number") {
                currentScreen.textContent = answer;
                // FIX (minor): previousScreen was left showing the stale
                // "firstValue operator" from before the error. Now it
                // shows the full equation that actually failed, matching
                // what the "=" handler already does on error.
                previousScreen.textContent = firstValue+" "+ operator+" "+ secondValue;
                firstValue = "";
                secondValue = "";
                operator = "";
                waitingForSecondValue = false;
                resultDisplayed = true;
                return;
            }

            answer = Math.round(answer * 1000) / 1000; // round to 3 decimal places
            firstValue = answer.toString();
            secondValue = "";

            operator = button.textContent;
            waitingForSecondValue = true;
            currentScreen.textContent = answer;
            previousScreen.textContent = answer+ " " + operator;
        } else {
            operator = button.textContent;
            previousScreen.textContent = firstValue+ " " + operator;
            waitingForSecondValue = true;
        }

         })

        })

    
        //deecimal event listener
        decimal.addEventListener("click", () => {
            resetIfResultDisplayed();
            if(!waitingForSecondValue && !firstValue.includes(".")){
                firstValue  = (firstValue ==="") ? "0." : firstValue + ".";
                currentScreen.textContent = firstValue;
            }
            else if(waitingForSecondValue && !secondValue.includes(".")){
                secondValue  = (secondValue ==="") ? "0." : secondValue + ".";
                currentScreen.textContent = secondValue;
            }
        })


        //clear button event listener
        clearButton.addEventListener("click", () => {
            firstValue ="";
            secondValue ="";
            operator ="";
            currentScreen.textContent ="0";
            previousScreen.textContent ="";
            waitingForSecondValue = false;
            resultDisplayed = false;
        })


        //equal button event listener
        equal.addEventListener("click", () => {
            if(firstValue ==="" || secondValue ==="" || operator ===""){
                return;
            }

            let answer = operate(Number(firstValue), Number(secondValue), operator);

            if(typeof answer !== "number") {
                currentScreen.textContent = answer;
                previousScreen.textContent = firstValue+" "+ operator+" "+ secondValue+" =";
                firstValue = "";
                secondValue = "";
                operator = "";
                waitingForSecondValue = false;
                resultDisplayed = true;
                return;
            }
            else{
                answer = Math.round(answer * 1000) / 1000; // round to 3 decimal places
                currentScreen.textContent = answer;
                previousScreen.textContent = firstValue+" "+ operator+" "+ secondValue+" =";
                firstValue = answer.toString();
                secondValue = "";
                operator = "";
                waitingForSecondValue = false;
                resultDisplayed = true;
            }
        })


        //delete/backspace button event listener
        deleteButton.addEventListener("click", () => {

            // FIX (bug 2): resultDisplayed wasn't being cleared here.
            // Without this, backspacing right after "=" left the flag
            // true, so the very next digit typed would trigger
            // resetIfResultDisplayed() and wipe out the backspacing
            // you just did, before the new digit was even added.
            resultDisplayed = false;

            if (!waitingForSecondValue) {

        firstValue = firstValue.slice(0, -1);
        // FIX (minor): show "0" instead of a blank screen once
        // everything has been backspaced away, consistent with Clear.
        currentScreen.textContent = firstValue === "" ? "0" : firstValue;

        } else if ( secondValue !== "") {

        secondValue = secondValue.slice(0, -1);
        currentScreen.textContent = secondValue === "" ? "0" : secondValue;

        }

        })

    })


    function operate(num1, num2, operator) {
        switch(operator) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if(num2 === 0) {
                    return "Error: Division by zero!";
                }
                return num1 / num2;
                // FIX (nitpick): removed the `break;` lines after each
                // `return` — they were unreachable dead code, since
                // `return` already exits the function on its own.
        }

    }