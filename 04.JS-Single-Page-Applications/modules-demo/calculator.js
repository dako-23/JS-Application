export function sum(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export function subtraction(a, b) {
    return a - b;
}

export const divide = (a, b) => {
    return a / b;
}

const calculator = {
    sum,
    multiply,
    subtraction,
    divide,
};

export default calculator;
