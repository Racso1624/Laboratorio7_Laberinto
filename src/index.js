/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-else-return */
/* eslint-disable quotes */
/* eslint-disable no-empty */
/* eslint-disable arrow-body-style */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React from "react"
import ReactDOM from "react-dom/client"
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const App = () => {
    const [laberinto, setLaberinto] = React.useState([[]])
    const [ancho, setAncho] = React.useState(4)
    const [alto, setAlto] = React.useState(4)
    const [cambioMedidas, setCambioMedidas] = React.useState(false)
    const [partidaGanada, setPartidaGanada] = React.useState(false)

    const header_estilo = css`
        text-align: center;
    `

    const tablero_estilo = css`
        justify-content: center;
        align-items: center;
        display: grid;
        grid-template-columns: repeat(${(parseInt(ancho) * 3) + 1}, 20px);
        grid-template-rows: repeat(${(parseInt(alto) * 2) + 1}, 20px);
    `

    const muros_estilo = css`
        height: 20px;
        width: 20px;
        background: purple;
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

    const creacion_Laberinto = async (ancho_lab, alto_lab) => {
        let api = 'https://maze.juanelcaballo.club/?type=json&w=ancho&h=alto'
        api = api.replace('ancho', ancho_lab)
        api = api.replace('alto', alto_lab)
        const respuesta = await fetch(api)
            .then(respuesta => respuesta.json())
            .then(datos => datos)
            .catch(error => console.log(error))

        return respuesta
    }

    const modificar_Laberinto = async () => {
        const laberinto_modificado = await creacion_Laberinto(ancho, alto)
        setLaberinto(laberinto_modificado)
    }

    const cambiar_Medidas = () => {
        const ancho_input = Number(document.getElementById('ancho').value)
        const alto_input = Number(document.getElementById('alto').value)
        if (ancho_input > 0 && ancho_input < 11) {
            setAncho(ancho_input)
        }
        if (alto_input > 0 && alto_input < 11) {
            setAlto(alto_input)
        }

        setCambioMedidas(true)
    }

    const cambiar_posicion = (aumento_x, aumento_y) => {
        setLaberinto((posicion) => {
            const posicion_temporal = [...posicion]
            const posicion_y = posicion_temporal.findIndex((fila) => {
                return fila.indexOf('p') > -1
            })

            const posicion_x = posicion_temporal[posicion_y].findIndex((columna) => {
                return columna === 'p'
            })

            if (posicion_temporal[posicion_y + aumento_y][posicion_x + aumento_x] === 'g') {
                setPartidaGanada(true)
            } else if (posicion_temporal[posicion_y + aumento_y][posicion_x + aumento_x] === '|' || posicion_temporal[posicion_y + aumento_y][posicion_x + aumento_x] === '+' || posicion_temporal[posicion_y + aumento_y][posicion_x + aumento_x] === '-') {

            } else {
                posicion_temporal[posicion_y][posicion_x] = ' '
                posicion_temporal[posicion_y + aumento_y][posicion_x + aumento_x] = 'p'
            }

            return posicion_temporal
        })
    }

    const movimiento = () => {
        const tecla_presionada = event.key

        if (tecla_presionada === "a") {
            cambiar_posicion(-1, 0)
        } else if (tecla_presionada === "w") {
            cambiar_posicion(0, -1)
        } else if (tecla_presionada === "d") {
            cambiar_posicion(1, 0)
        } else if (tecla_presionada === "s") {
            cambiar_posicion(0, 1)
        }
    }

    React.useEffect(() => {
        if (cambioMedidas === true) {
            modificar_Laberinto()
            setCambioMedidas(false)
        }
    }, [cambioMedidas])

    React.useEffect(() => {
        modificar_Laberinto()
    }, [])

    React.useEffect(() => {
        if (partidaGanada === true) {
            alert("FELICIDADES HAS GANADO")
            modificar_Laberinto()
            setPartidaGanada(false)
        }
    }, [partidaGanada])

    window.onkeydown = movimiento

    return (
      <div className="app">
        <header css={header_estilo}>
          <h1>Bienvenido al Laberinto</h1>
          <p>Elige las medidas del laberinto (Entre 1 y 10): </p>
          <p>Puedes moverte utilizando las teclas WASD</p>
          Ancho <input type="number" id="ancho" min="1" max="10" />
          Alto <input type="number" id="alto" min="1" max="10" />
          <button onClick={cambiar_Medidas}>Generar</button>
        </header>
        <br />
        <div className="tablero" css={tablero_estilo}>
          {
            laberinto.map((posiciony, y) => posiciony.map((posicionx, x) => {
                    if (posicionx === "-" || posicionx === "|" || posicionx === "+") {
                        return <p key={(x + 5 + y + 10).toString()} css={muros_estilo} />
                    } if (posicionx === "p") {
                        return <p key={(x + 5 + y + 10).toString()} css={jugador_estilo} />
                    } if (posicionx === "g") {
                        return <p key={(x + 5 + y + 10).toString()} css={meta_estilo} />
                    } else {
                        return <p key={(x + 5 + y + 10).toString()}>{posicionx}</p>
                    }
                }))
            }
        </div>
      </div>
    )
}

const container = document.getElementById("root")

const root = ReactDOM.createRoot(container)

root.render(<App />)
