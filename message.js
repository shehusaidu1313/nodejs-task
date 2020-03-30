const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {
  res.end(`
    <html><body><form action="/message" method="POST"><input type="text" name="message"><br>
      <input type="submit" value="Submit message"></form></body></html>
  `);
  if (req.method === 'POST' && req.url === '/message') {
    let body = [];
    req.on('error', (err) => {
      console.log(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
    });
    fs.writeFile('message.txt', body, (err) => {
      if (err) throw err;
    });
  } else {
    res.end();
  }
}).listen(8080);
