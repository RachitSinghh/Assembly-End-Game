import React from "react";
import { useState } from "react";

function CurrentWord() {
  const [currentWord, setCurrentWord] = useState("react");
  const letterElements = currentWord
    .toUpperCase()
    .split("")
    .map((letter) => <span>{letter}</span>);

  return <section className="word">{letterElements}</section>;
}

export default CurrentWord;
