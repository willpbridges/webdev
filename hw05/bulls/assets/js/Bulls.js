import React, { useState } from 'react';
import {
    uniq, bad_guesses, lives_left,
    get_number, get_message, get_bulls, get_cows
} from './game';
import { ch_join, ch_push, ch_reset } from './socket';

function Victory({ reset }) {
    return (
        <div className="App">
            <h1>You win!</h1>
            <p>
                <button onClick={reset}>
                    Reset
          </button>
            </p>
        </div>
    );
}

function GameOver({ reset }) {
    return (
        <div className="App">
            <h1>Game Over!</h1>
            <p>
                <button onClick={reset}>
                    Reset
          </button>
            </p>
        </div>
    );
}

function Bulls(_) {
    const solution = get_number();
    const [state, setState] = useState({
        secret: solution,
        guesses: [],
        text: "",
        message: "Enter a unique 4-digit number",
    });

    let { secret, guesses, text, message } = state;
    let bads = bad_guesses(secret, guesses);
    let lives = lives_left(secret, guesses);
    let fullGuesses = []

    for (let i = 0; i < bads.length; i++) {
        fullGuesses.push(
            "" + bads[i] +
            " | Bulls: " + get_bulls(bads[i], secret) +
            ", Cows: " + get_cows(bads[i], secret)
        )
    }

    function updateText(ev) {
        let vv = ev.target.value;
        let state1 = Object.assign({}, state);
        state1.text = vv;
        setState(state1);
    }

    function guess() {
        let state1 = Object.assign({}, state);
        state1.message = get_message(state1.text);
        let ng = uniq(state1.guesses.concat(text));
        state1.text = "";
        state1.guesses = ng;
        setState(state1);
    }

    function keyPress(ev) {
        if (ev.key == "Enter") {
            guess();
        }
    }

    if (lives <= 0) {
        return <GameOver reset={
            () => {
                const solution = get_number();
                let state1 = Object.assign({}, state);
                state1.text = "";
                state1.guesses = [];
                state1.secret = solution;
                state1.message = "Enter a unique 4-digit number";
                setState(state1);
            }
        } />;
    }

    if (guesses.length > 0) {
        if (get_bulls(secret, guesses[guesses.length - 1]) === 4) {
            return <Victory reset={
                () => {
                    const solution = get_number();
                    let state1 = Object.assign({}, state);
                    state1.text = "";
                    state1.guesses = [];
                    state1.secret = solution;
                    state1.message = "Enter a unique 4-digit number";
                    setState(state1);
                }
            } />;
        }
    }

    return (
        <div className="App">
            <h1>
                <a href="http://willbridges.website">Home</a>
            </h1>
            <h1>{message}</h1>
            <p>
                <input type="text"
                    maxLength="4"
                    value={text}
                    onChange={updateText}
                    onKeyPress={keyPress} />
                <button onClick={guess}>Guess</button>
                <button onClick={
                    () => {
                        const solution = get_number();
                        let state1 = Object.assign({}, state);
                        state1.text = "";
                        state1.guesses = [];
                        state1.secret = solution;
                        state1.message = "Enter a unique 4-digit number";
                        setState(state1);
                    }
                }>
                    Reset   
                </button>
            </p>
            <h1>Lives: {lives + '\r\n'}</h1>
            <h1>Guesses: {'\r\n' +fullGuesses.join("\r\n")}</h1>
        </div>
    );
}