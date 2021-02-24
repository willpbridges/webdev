// I used Prof. Tuck's lecture code for moving the
// Hangman game logic into Elixir as starter code

import React, { useState, useEffect } from 'react';
import { ch_join, ch_push, ch_reset } from './socket';

function SetTitle({ text }) {
    useEffect(() => {
        let orig = document.title;
        document.title = text;

        // Cleanup function
        return () => {
            document.title = orig;
        };
    });

    return <div />;
}

function Victory(props) {
    let { reset } = props;

    return (
        <div className="row">
            <SetTitle text="Victory!" />
            <div className="column" style={{ textAlign: "center" }}>
                <h1><a href="http://willbridges.website">Home</a></h1>
                <h1>You win!</h1>
                <p>
                    <button onClick={reset}>
                        Reset
                    </button>
                </p>
            </div>
        </div>
    );
}

function GameOver(props) {
    let { reset } = props;

    return (
        <div className="row">
            <SetTitle text="Game Over!" />
            <div className="column" style={{ textAlign: "center" }}>
                <h1><a href="http://willbridges.website">Home</a></h1>
                <h1>Game Over!</h1>
                <p>
                    <button onClick={reset}>
                        Reset
                    </button>
                </p>
            </div>
        </div>
    );
}

function Controls({ guess, reset }) {
    const [text, setText] = useState("");

    function updateText(ev) {
        let vv = ev.target.value;
        setText(vv);
    }

    function keyPress(ev) {
        if (ev.key == "Enter") {
            guess(text);
        }
    }

    return (
        <div className="column" style={{ textAlign: "center" }}>
            <p>
                <input id="input_field"
                    type="text"
                    maxLength="4"
                    value={text}
                    onChange={updateText}
                    onKeyPress={keyPress} />
            </p>
            <p>
                <button onClick={() => {
                    setText("");
                    guess(text);
                }}>Guess</button>
            </p>
            <p>
                <button onClick={() => {
                    setText("");
                    reset();
                }}>Reset</button>
            </p>
        </div>
    );
}

function Bulls(_) {
    const [state, setState] = useState({
        guesses: [],
        message: "Enter a unique 4-digit number",
        hints: []
    });

    let { guesses, message, hints, lives, bulls } = state;
    let view = hints && hints.join("\r\n");
    let last_guess = guesses[guesses.length - 1];

    useEffect(() => {
        ch_join(setState);
    });

    function guess(text) {
        ch_push({ num: text });
    }

    function reset() {
        console.log("Time to reset");
        ch_reset();
    }

    let body = null;

    if (bulls == 4) {
        body = (
            <div>
                <Victory reset={reset} />
                <h1>Winning guess: {last_guess}</h1>
            </div>
        );
    } else if (lives > 0) {
        body = (
            <div className="row">
                <div className="column">
                    <h1><a href="http://willbridges.website">Home</a></h1>
                    <h1> {message} </h1>
                    <Controls reset={reset} guess={guess} />
                </div>
                <div className="column">
                    <h1>Lives: {lives}</h1>
                    <h1>Guesses: {'\r\n' + view}</h1>
                </div>
            </div>
        )
    }
    else {
        body = (
            <div>
                <GameOver reset={reset} />
            </div>
        );
    }

    return (
        <div className="container">
            {body}
        </div>
    );

}

export default Bulls;