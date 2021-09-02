const http = require("http");
const fs = require("fs");
var requests = require("requests");
let homepage = fs.readFileSync("index.html","utf-8");
function replaceval(temppage,val){
    let page = temppage.replace("{%temp%}",val.main.temp);
    page = page.replace("{%tempmin%}",val.main.temp_min);
    page = page.replace("{%tempmax%}",val.main.temp_max);
    page = page.replace("{%tempstat%}",val.weather[0].main);
    console.log(page);
    return page;
}
const server = http.createServer((req,res)=>{
    if(req.url == "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?lat=26.850251&lon=92.773411&units=metric&appid=5858ffded9d90ce4c9a205c8c7047969')
        .on('data', (chunk) => {
            objdata = JSON.parse(chunk);
            let page = replaceval(homepage,objdata);
            res.writeHead(200,{"Content-type" :  "text/html"})
            res.end(page);
        })
        .on('end',(err) => {
        if (err) return console.log('connection closed due to errors', err);
        console.log('end');
        });
    }
});
server.listen(80,"127.0.0.1",()=>{
    console.log("Listening");
})
// https://api.openweathermap.org/data/2.5/weather?lat=26.850251&lon=92.773411&units=metric&appid=5858ffded9d90ce4c9a205c8c7047969