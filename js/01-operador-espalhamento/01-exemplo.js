// exemplo do operador de espalhamento (spread operator)

function juntaPalavras(...palavras) {
    console.log(palavras);
    console.log(typeof(palavras));
    let resultado = "";
    for (let i = 0; i < palavras.length; i++) {
        resultado = resultado + "|" + palavras[i];
    }
    return resultado;
}

let palavras = juntaPalavras("Ivo", "Leo", "Jonas", "Fabio");

console.log(palavras);

