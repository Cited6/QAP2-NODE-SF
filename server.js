const http = require("http");
const fs = require("fs");
const path = require("path");
const EventEmitter = require("events");

const server = http.createServer((request, response) => {
  const url = request.url;

  if (url === "/about") {
    serveHTMLFile(response, "about.html");
    myEmitter.emit("routeAccessed", "/about");
  } else if (url === "/contact") {
    serveHTMLFile(response, "contact.html");
    myEmitter.emit("routeAccessed", "/contact");
  } else if (url === "/products") {
    serveHTMLFile(response, "products.html");
    myEmitter.emit("routeAccessed", "/products");
  } else if (url === "/subscribe") {
    serveHTMLFile(response, "subscribe.html");
    myEmitter.emit("routeAccessed", "/subscribe");
  } else if (url === "/home") {
    serveHTMLFile(response, "home.html");
    myEmitter.emit("routeAccessed", "/home");
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("404 Not Found");
  }
});

function serveHTMLFile(response, filename) {
  const filePath = path.join(__dirname, "views", filename);

  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500  Server Error");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(content);
    response.end();
  });
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const myEmitter = new EventEmitter();

myEmitter.on("serverError", (errorMessage) => {
  console.log(`Server Error: ${errorMessage}`);
});

myEmitter.on("routeAccessed", (accessedRoute) => {
  console.log(`Route Accessed: ${accessedRoute}`);
});

const errorMessage = "Something went wrong!";
myEmitter.emit("serverError", errorMessage);

const accessedRoute = "/about";
myEmitter.emit("routeAccessed", accessedRoute);
