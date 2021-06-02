// exemplo de um servidor de páginas

const http = require('http');

const server = http.createServer(
    (request, response) => {

        response.writeHead(200 /*status sucesso*/, {'Content-Type': 'text/html'});

        // tenho a string da URL da requisição
        response.write('<head><meta charset="UTF-8"></head>');
        if (request.url === '/') {
            response.write('<h1>Página do Ivo</h1>');
            response.write('<ul>');
            response.write('<li><a href="/">home</a></li>');
            response.write('<li><a href="/artigos">artigos</a></li>');
            response.write('<li><a href="/contato">contato</a></li>');
            response.write('</ul>');
        } else if (request.url === '/artigos') {
            response.write('<h1>Artigos do Ivo</h1>');
            response.write('<ul>');
            response.write('<li><a href="https://www.researchgate.net/profile/Natalie-Walker-15/publication/322077322_Proceedings_of_the_Third_International_Conference_on_Computing_Technology_and_Information_Management_ICCTIM2017_Thessaloniki_Greece_2017/links/5a4369dda6fdcce19716a967/Proceedings-of-the-Third-International-Conference-on-Computing-Technology-and-Information-Management-ICCTIM2017-Thessaloniki-Greece-2017.pdf#page=92">Ontology-Based Data Mining Approach for Judo Technical Tactical Analysis</a></li>');
            response.write('</ul>');
            response.write('<br>');
            response.write('<a href="/">voltar</a>');
        } else if (request.url === '/contato') {
            response.write('<h1>Contatos do Ivo</h1>');
            response.write('<ul>');
            response.write('<li><a href="mailto:ivolapuma@gmail.com">ivolapuma@gmail.com</a></li>');
            response.write('<li><a href="www.linkedin.com/in/ivolapuma">LinkedIn</a></li>');
            response.write('</ul>');
            response.write('<br>');
            response.write('<a href="/">voltar</a>');
        } else {
            response.write('<h1>Ops... Página não encontrada!</h1>');
            response.write('<br>');
            response.write('<a href="/">voltar</a>');
        }

        response.end();
    }
);

server.listen(3000, ()=> {console.log("Servidor está rodando, escutando a porta 3000")});
