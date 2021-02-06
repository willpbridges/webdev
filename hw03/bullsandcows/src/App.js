import { useState } from 'react';
import {
  uniq, bad_guesses, word_view, lives_left, 
  get_number, get_message, get_bulls, get_cows
} from './game';
import './App.css';

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

function App() {

  const solution = get_number();
  const [secret, _setSecret] = useState(solution);

  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState("");
  const [message, setMessage] = useState("Enter a unique 4-digit number");

  let view = word_view(secret, guesses);
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
    setText(vv);
  }

  function guess() {
    setText("");
    console.log(secret);
    setMessage(get_message(text));
    let ng = uniq(guesses.concat(text));
    setGuesses(ng);
  }

  function keyPress(ev) {
    if (ev.key == "Enter") {
      guess();
    }
  }

  if (lives <= 0) {
    return <GameOver reset={
      () => {
        setGuesses([]);
        const solution = get_number();
        _setSecret(solution);
        setMessage("Enter a unique 4-digit number");
      }
    } />;
  }

  if (guesses.length > 0) {
    if (get_bulls(secret, guesses[guesses.length - 1]) === 4) {
      return <Victory reset={
        () => {
          setGuesses([]);
          const solution = get_number();
          _setSecret(solution);
          setMessage("Enter a unique 4-digit number");
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
      </p>
      <p>
        <button onClick={
          () => {
            setText("");
            setGuesses([]);
            const solution = get_number();
            _setSecret(solution);
            setMessage("Enter a unique 4-digit number");
          }
        }>
          Reset
        </button>
      </p>
      <h1>Lives: {lives + '\r\n'}</h1>
      <h1>Guesses: {"\r\n" + fullGuesses.join("\r\n")}</h1>
    </div>
  );
}

export default App;
