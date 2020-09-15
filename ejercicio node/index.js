const axios = require('axios');
const fs = require('fs');
const url = require('url');
const parse = require('node-html-parser')
var http = require('http');

let arreglo1;
let arreglo2;




axios({
  method: 'get',
  url: 'https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json'
}).then(function (response) {
  var aaaa=JSON.stringify(response.data)
  let prueba=JSON.parse(aaaa);
  arreglo1=prueba;

})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});
axios({
  method: 'get',
  url: 'https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json'
}).then(function (response) {
  var aaaa=JSON.stringify(response.data)
  let prueba=JSON.parse(aaaa);
  arreglo2=prueba;

})
.catch(function (error) {
  // handle error
  console.log(error);
})
.then(function () {
  // always executed
});




//create a server object:
http.createServer(function (req, res) {
  var dirección = url.parse(req.url, true);
  var status = "";

  if(dirección.pathname == "/api/proveedores")
  {
    var prov= arreglo1;
    fs.readFile('proveedores.html', function(err, data) {
      let root= parse.parse(data);
      let tabla=root.querySelector('body').querySelector('table').querySelector('#proveedores');
      prov.forEach(element => {
        tabla.insertAdjacentHTML('beforebegin', '<tr><td>'+element.idproveedor + '</td><td>'+element.nombrecompania+'</td><td>'+element.nombrecontacto +'</td></tr>');
      });
      
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(root.toString());
      res.write(status);
      return res.end();
  })

  }
  else if(dirección.pathname == "/api/clientes"){
    var cli= arreglo2;
    fs.readFile('clientes.html', function(err, data) {
      let root= parse.parse(data);
      let tabla=root.querySelector('body').querySelector('table').querySelector('#clientes');
      cli.forEach(element => {
        tabla.insertAdjacentHTML('beforebegin', '<tr><td>'+element.idCliente + '</td><td>'+element.NombreCompania+'</td><td>'+element.NombreContacto +'</td></tr>');
      });
      
      
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(root.toString());
      res.write(status);
      return res.end();
  });
    
  }

  
}).listen(8081);
