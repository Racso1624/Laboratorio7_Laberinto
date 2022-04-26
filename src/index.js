import React from "react";
import ReactDOM from "react-dom/client";
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const App = () =>{

    const [laberinto, setLaberinto] = React.useState([[]])
    const [ancho, setAncho] = React.useState(4)
    const [alto, setAlto] = React.useState(4)

    const tablero_estilo = css `
        display: grid;
        grid-template-columns: repeat(${(parseInt(ancho) * 3) + 1}, 20px);
        grid-template-rows: repeat(${(parseInt(alto) * 2) + 1}, 20px);
    `

    const muros_estilo = css `
        height: 20px;
        width: 20px;
        background: red;
    `

    const jugador_estilo = css`
        height: 20px;
        width: 20px;
        background: green;
        clip-path: polygon(50% 0%, 85% 27%, 50% 100%, 15% 28%);
    `

    const meta_estilo = css`
        height: 20px;
        width: 20px;
        background: yellow;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    `

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
            <h1>Bienvenido al Laberinto</h1>
            <p>Elige las medidas del laberinto (Entre 1 y 10): </p>
            Ancho<input type="number" id="ancho" min="1" max="10"></input>
            Alto<input type="number" id="alto" min="1" max="10"></input>
            <button onClick={cambiar_Medidas}>Generar</button>
            <div className="tablero" css = {tablero_estilo}>
                {
                    laberinto.map((posiciony, y) =>
                        posiciony.map((posicionx, x) => {
                            if(posicionx == "-" || posicionx == "|" || posicionx == "+"){
                                return <p key={(x + 5 + y + 10).toString()} css = {muros_estilo}></p>
                            }
                            else if(posicionx == "p"){
                                return <p key={(x + 5 + y + 10).toString()} css = {jugador_estilo}></p>
                            }
                            else if(posicionx == "g"){
                                return <p key={(x + 5 + y + 10).toString()} css = {meta_estilo}></p>
                            }
                            else{
                                return <p key={(x + 5 + y + 10).toString()}>{posicionx}</p>
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