const calculadora = require('./calculadora');

console.log(`soma de 10 + 20 = ${calculadora.somar(10, 20)}`);
console.log(`subtracao de 10 - 20 = ${calculadora.subtrair(10, 20)}`);
console.log(`multiplicacao de 10 * 20 = ${calculadora.multiplicar(10, 20)}`);
console.log(`divisao de 10 / 20 = ${calculadora.dividir(10, 20)}`);

console.log(`somar 10, 20, 30, 40 = ${calculadora.somarNumeros(10, 20, 30, 40)}`);
console.log(`subtrair 10, 20, 30, 40 = ${calculadora.subtrairNumeros(10, 20, 30, 40)}`);
console.log(`multiplicar 10, 20, 30, 40 = ${calculadora.multiplicarNumeros(10, 20, 30, 40)}`);
console.log(`dividir 10, 20, 30, 40 = ${calculadora.dividirNumeros(10, 20, 30, 40)}`);