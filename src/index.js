import React from "react";
import ReactDOM from "react-dom";

const creacion_Laberinto = async(ancho, alto) =>{
    const respuesta = await fetch('https://maze.juanelcaballo.club/?type=json&w=${ancho}&h=${alto}')
        .then(respuesta => respuesta.json())
        .then(datos => datos)
    console.log(respuesta)
    return respuesta
    .catch(error =>
        console.log(error))
}

const App = () =>{

    const [laberinto, setLaberinto] = React.useState([])
    const [ancho, setAncho] = React.useState(4)
    const [alto, setAlto] = React.useState(4)

    const modificar_Laberinto = async() =>{
        const laberinto_modificado = await creacion_Laberinto(ancho_laberinto, alto_laberinto)
        setLaberinto(laberinto_modificado)
    }   

    const actualizar_Laberinto = async(nuevoLaberinto) => {
        modificar_Laberinto(nuevoLaberinto)
    }

    const cambiar_Medidas = () =>{
        var ancho_input = Number(document.getElementById("ancho").value)
        var alto_input = Number(document.getElementById("alto").value)
        if(ancho_input !== ""){
            setAncho(ancho_input)
        }
        if(alto_input !== ""){
            setAlto(alto_input)
        }
        console.log(ancho)
        console.log(alto)
    }

    return(
        <div className="app">
            <h1>Bievenido al Laberinto</h1>
            <p>Elige las medidas del laberinto: </p>
            Ancho<input type="number" id="ancho"></input>
            Alto<input type="number" id="alto"></input>
            <button onClick={cambiar_Medidas}>Generar</button>

        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))