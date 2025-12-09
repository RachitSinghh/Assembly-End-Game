import { useState } from "react";
import { getFarewellText, getRandomWord } from "./utils.js";
import { clsx } from "clsx";
import { languages } from "./languages";

import Confetti from "react-confetti";

export default function AssemblyEndgame() {
  // State values
  // const [currentWord, setCurrentWord] = useState("react");
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  // Dervided values
  // Calculate how many wrong guesses the player has made

  const wrongGuessCount = guessedLetters.filter(
    (letter) => !currentWord.includes(letter),
  ).length;

  // Check if player has won by guessing all letters in the current word

  const isGameWon = currentWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  console.log(isGameWon);
  // Check if player has lost by exceeding maximum wrong guesses

  const isGameLost = wrongGuessCount >= languages.length - 1;
  // Determine if the game has ended (either won or lost)

  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessedIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  // static values

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  // Add a guessed letter to the state (only if not already guessed)
  function addGuessedLetter(letter) {
    setGuessedLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter],
    );
  }

  // Render language chips, marking lost languages based on wrong guess count
  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span
        className={`chip ${isLanguageLost ? "lost" : ""}`}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    );
  });

  // Render the current word with letters revealed only if guessed

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter = isGameLost || guessedLetters.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessedLetters.includes(letter) && "missed-letter",
    );
    return (
      <span key={index} className={letterClassName}>
        {/* {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}*/}
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  // Render keyboard buttons with correct/wrong styling based on guesses

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        aria-disabled={guessedLetters.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
        disabled={isGameOver}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessedIncorrect,
  });

  function renderGameStatus() {
    if (!isGameOver && isLastGuessedIncorrect) {
      return (
        <p className="farewell-message">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }

    return null;
  }

  function resetGame() {
    setGuessedLetters([]);
    setCurrentWord(getRandomWord);
  }
  return (
    <main>
      {isGameWon && (
        <Confetti
          numberOfPieces={300} // how many confetti pieces
          gravity={0.3} // stops after falling
          recycle={false} // stops after falling
        />
      )}
      <header>
        <h1>Skribble: For Computer Science Nerds</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {renderGameStatus()}
      </section>
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard">{keyboardElements}</section>
      <section className="sr-only" aria-live="polite" role="status">
        {/* Anything that we're going to put in this section just going to be read out by the Screen readers only */}
        <p>
          Current Word:{" "}
          {currentWord
            .split("")
            .map((letter) =>
              guessedLetters.includes(letter) ? letter + "." : "blank.",
            )
            .join(" ")}
        </p>
      </section>
      {isGameOver && (
        <button className="new-game" onClick={resetGame}>
          New Game
        </button>
      )}
    </main>
  );
}

// BackLog:
// make new game button work
// choose a random word from a list of words
// confetting drop the user wins
