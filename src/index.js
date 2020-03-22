function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let lf = 0;
    let rt = 0;
    let arrayEx = expr.split('')
        .filter(item => !!item && item !== ' ')
        .map(i => {
            if (i === '(') {
                return `( `; }
            if (i === ')') {
                return ` )`; }
            if (i === "*" || i === "/" || i === "+" || i === "-") return ` ${i} `
            return i;
        }).join('').split(' ')

    arrayEx.forEach((item) => {
        if (item === '(') {
            lf++;   }
        if (item === ')') {
            rt++; }
    })

    if ((lf + rt) !== 0) {
        throw new Error('ExpressionError: Brackets must be paired')
    }

    let dot = 0
    arrayEx.forEach((item, index) => {
        if (item === '(') dot++
    })


    for (let i = 0; i < dot; i++) {
        if (arrayEx.indexOf('(') >= 0) {
            let start = arrayEx.indexOf('(')
            let next = arrayEx.indexOf('(', start + 1)
            let end = arrayEx.indexOf(')')
            for (let a = i; a < dot; a++) {

                if (next > end || next < 0) {
                    let arr = arrayEx.slice(start + 1, end)
                    let positionStart = !start ? 0 : start
                    arrayEx.splice(positionStart, arr.length + 2, result(arr))

                    break
                } else {
                    start = arrayEx.indexOf('(', next)
                    next = arrayEx.indexOf('(', next + 1)
                }
            }
        }
    }
    return result(arrayEx)
}

function result(arr) {
    if (arr.includes('*') || arr.includes('/')) {
        let dot = arr.length

        for (let i = 0; i < dot; i++) {
            if (arr[i] === '/') {
                let index = arr.indexOf('/')
                if (index >= 0) {
                    if (arr[index + 1] === '0') {
                        throw new Error('TypeError: Division by zero.');
                    }
                    let a = arr[index - 1]
                    let b = arr[index + 1]
                    arr[index] = delenie(a, b)
                    arr.splice(index + 1, 1)
                    arr.splice(index - 1, 1)
                    i--
                }
            }
            if (arr[i] === '*') {
                let index = arr.indexOf('*')
                if (index >= 0) {
                    let a = arr[index - 1]
                    let b = arr[index + 1]
                    arr[index] = umn(a, b)
                    arr.splice(index + 1, 1)
                    arr.splice(index - 1, 1)
                    i--
                }
            }
        }
    }

    let res = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '+') {
            let b = arr[i + 1]
            res = plus(res, b)
            i++
        }
        if (arr[i] === '-') {
            let b = arr[i + 1]
            res = minus(res, b)
            i++
        }

    }

    return res
}

function umn(a, b) {
    a = +a
    b = +b
    return a * b
}

function delenie(a, b) {
    a = +a
    b = +b
    let res = a / b
    return res
}

function minus(a, b) {
    a = +a
    b = +b
    return a - b
}

function plus(a, b) {
    a = +a
    b = +b
    return a + b
}

   
    // write your solution here
    module.exports = {
        expressionCalculator
      }

