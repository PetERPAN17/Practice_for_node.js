var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body){
    return `<!doctype html>
            <html>
            <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                ${list}
                </ol>
                ${body}
            </body>
            </html>`;
}

function templateLis(files) {
    var list = '';
    files.forEach(file => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
    });
    return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    const readFolder = './data';

    if (pathname === '/') {
        if (queryData.id === undefined) {
            fs.readdir(readFolder, (err, files) => {
                var list = templateLis(files);
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                response.writeHead(200);
                response.end(template);
            });
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf-8', (err, description) => {
                fs.readdir(readFolder, (err, files) => {
                    var list = templateLis(files);
                    var title = queryData.id;
                    var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
                    response.writeHead(200);
                    response.end(template);
                });
            });
        }
    } else {
        response.writeHead(404);
        response.end('not found');
    }
});
app.listen(3000);