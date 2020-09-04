
var respuesta=secret([1,2,3,4], "encrypt", 1 );

console.log(respuesta);

function secret( arreglo, verbo, number)
{
 if (verbo==="encrypt"){
    for(var i = 0; i < arreglo.length; i++){
        arreglo[i]=arreglo[i]+number;
    }
    return arreglo;
 } else if (verbo==="decrypt"){
    for(var i = 0; i < arreglo.length; i++){
        arreglo[i]=arreglo[i]-number;
    }
    return arreglo;
 } else{
    console.log("inserte una palabra valida")
 }

}


