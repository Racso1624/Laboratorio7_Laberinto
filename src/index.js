import React from "react";
import ReactDOM from "react-dom/client";
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const App = () =>{

    const [laberinto, setLaberinto] = React.useState([[]])
    const [ancho, setAncho] = React.useState(4)
    const [alto, setAlto] = React.useState(4)

    const creacion_Laberinto = async (ancho_lab, alto_lab) =>{
        var api = 'https://maze.juanelcaballo.club/?type=json&w=ancho&h=alto'
        api = api.replace('ancho', ancho_lab)
        api = api.replace('alto', alto_lab)
        const respuesta = await fetch(api)
            .then(respuesta => respuesta.json())
            .then(datos => datos)
            .catch(error => console.log(error))
    
        return respuesta
    }

    const modificar_Laberinto = async() =>{
        const laberinto_modificado = await creacion_Laberinto(ancho, alto)
        setLaberinto(laberinto_modificado)
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

        modificar_Laberinto()
    }

    React.useEffect( () => {
        modificar_Laberinto()
    }, [])

    return(
        <div className="app">
            <h1>Bievenido al Laberinto</h1>
            <p>Elige las medidas del laberinto: </p>
            Ancho<input type="number" id="ancho"></input>
            Alto<input type="number" id="alto"></input>
            <button onClick={cambiar_Medidas}>Generar</button>
            <div className="tablero">
            {
                laberinto.map((posiciony, y) =>
                    posiciony.map((posicionx, x) => {
                        if(posicionx == "-" || posicionx == "|" || posicionx == "+"){
                            <p key={(x + 5 + y + 10).toString()}>{posicionx}</p>
                        }
                    })
                )
            }
            </div>
        </div>
    )
}

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(<App />);