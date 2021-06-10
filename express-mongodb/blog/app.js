const express = require('express');
const consign = require('consign');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

consign()
    .include('constants')
    .then('models')
    .then('controllers')
    .then('routes')
    .into(app);

console.log(`app.constants:`)
console.log(app.constants)

app.listen(
    app.constants.app.port, 
    ()=> {
        console.log(`Servidor rodando, escutando a porta ${app.constants.app.port}`);
    }
);

app.get('/', (_, response)=>response.status(200).send('Servidor rodando, tudo OK!'));