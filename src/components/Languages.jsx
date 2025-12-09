import React from "react";
import { languages } from "../languages";

function Languages() {
  const languageElements = languages.map((lang) => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
      <span className="chip" key={lang.name} style={styles}>
        {lang.name}
      </span>
    );
  });

  return <section className="language-chips">{languageElements}</section>;
}

export default Languages;
