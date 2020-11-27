import React, {  useState } from "react";
import { useEffect } from "react";
import md5 from "md5";

const privK= "f7c2af1bade6016326a191e6077b4f5c79979779";
const pubk= "cd715021f101344749cee5be334aa073";



function Joke() {
    
    const [joke, setJoke] = useState([]);
    useEffect(()=>{
        if(!navigator.onLine){
            if(localStorage.getItem("joke") === null) {
                setJoke("Loading...")
            } else {
                setJoke(localStorage.getItem("joke"));
            }
        } else {
            const url = new URL("https://gateway.marvel.com/v1/public/characters?");
            let hashed = md5("Hola"+privK+pubk);
            let params = {
                ts:"Hola",
                hash: hashed,
                apikey: pubk

            };
            url.search = new URLSearchParams(params);
            fetch(url).then(res=>res.json()).then(res=>{
                setJoke(res.data.results);
                localStorage.setItem("joke", JSON.stringify(res.data.results));
            })
        }
    }, []);

  
    
    return (
        <div>
            <h1>Heroes:</h1>
          <p>{joke.length} heroes</p>
          {joke.map((heroe) =>{
              return(
                <div>{heroe.name}</div>
              );
          })}
          
        </div>
    );
    
  }
  
  export default Joke;


