const axios = require('axios');
const fs = require('fs');
const url = require('url');
const parse = require('node-html-parser')
var http = require('http');

const promesaProv = axios.get("https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json")

promesaProv.then((message) => {
  let arreglo=JSON.parse(message);
  return arreglo;
})



//create a server object:
http.createServer(function (req, res) {
  var dirección = url.parse(req.url, true);
  var status = "";

  if(dirección.pathname == "/api/proveedores")
  {
    var prov= promesaProv;
    fs.readFile('proveedores.html', function(err, data) {
      let root= parse.parse(data);
      let tabla=root.querySelector('body').querySelector('table').querySelector('#tbody-proeedores');
      prov.forEach(element => {
        tabla.insertAdjacentHTML('beforebegin', '<tr><td>'+element.idproveedor + '</td><td>'+element.nombrecompañia+'</td><td>'+element.nombrecontacto+'</td></tr>');
      });
      
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(root.toString());
      res.write(status);
      return res.end();
  })

  }
  else if(dirección.pathname == "/api/clientes"){
    name = dirección.query["name"] + ":";
    fs.readFile('clientes.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data); //write a response to the client
      res.end(); //end the response
  });
    
  }

  
}).listen(8081);