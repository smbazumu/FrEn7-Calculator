const inputs = document.getElementById("inputs")

let currentNum = ""
let previousNum = ""
let operator = ""

let recent = false

function addNum(num) {
    if (inputs.value === "0") {
        inputs.value = num
    } else if (recent === true) {
        clearInput()
        inputs.value = num
        recent = false
    } else {
        inputs.value += num
    }
    currentNum = inputs.value
}

function addComma() {
    if (inputs.value.includes('.')) {
        return
    } else {
        inputs.value += '.'
        currentNum = inputs.value
    }
}

function chooseOp(op) {
    if (operator !== "") {
        result()
    }
    previousNum = inputs.value
    operator = op
    inputs.value = "0"
    currentNum = ""
    recent = false
}

let answer

function result() {
    let firstNum = parseFloat(previousNum)
    let secondNum = parseFloat(currentNum)
    if (operator === "+") {
        answer = firstNum + secondNum
    } else if (operator === "-") {
        answer = firstNum - secondNum
    } else if (operator === "*") {
        answer = firstNum * secondNum
    } else if (operator === "÷" || operator === "/") {
        if (secondNum === 0) {
            answer = "Error"
            inputs.value = answer
            return
        }
        answer = firstNum / secondNum
    } else if (operator === "MOD") {
        answer = firstNum % secondNum
    }
    
    inputs.value = answer
    recent = true
}

function removeNum() {
    inputs.value = inputs.value.slice(0, -1)
    
    if (inputs.value === "") {
        inputs.value = "0"
    }
}

function calcPercent() {
    let answer = currentNum / 100
    inputs.value = answer
    currentNum = inputs.value
}

function clearInput() {
    inputs.value = "0"
    currentNum = ""
    previousNum = ""
    operator = ""
}

document.addEventListener("keydown", function(event) {
    const keys = event.key
    
    if (keys >= "0" && keys <= 9) {
        addNum(keys)
        return
    }

    if (keys === "+" || keys === "-" || keys === "*" || keys === "/") {
        chooseOp(keys)
        return
    }

    if (keys === "Backspace") {
        removeNum()
        return
    }

    if (keys === "Escape") {
        clearInput()
        return
    }

    if (keys === "Enter") {
        result()
        return
    }

    if (keys === "%") {
        calcPercent()
        return
    }

    if (keys === "M" || keys === "m") {
        chooseOp("MOD")
        return
    }
}) 