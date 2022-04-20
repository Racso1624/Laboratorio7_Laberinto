import React from "react";
import ReactDOM from "react-dom";

const creacion_Laberinto = async(ancho, alto) =>{
    const respuesta = await fetch('https://maze.juanelcaballo.club/?type=json&w=${ancho}&h=${alto}')
        .then(respuesta => respuesta.json())
        .then(datos => datos)
    return respuesta 
}

const modificar_Laberinto = async() =>{
    const laberinto_modificado = await creacion_Laberinto(ancho_laberinto, alto_laberinto)
}

const App = () =>{
    return <h1>Bievenido al Laberinto</h1>
}

ReactDOM.render(<App/>, document.getElementById('root'))