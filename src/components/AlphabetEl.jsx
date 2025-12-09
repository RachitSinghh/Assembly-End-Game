import React from 'react';

function AlphabetEl() {
  const alphabets = "qwertyuiopasdfghjklzxcvbnm"
  
  const alphabetElements = alphabets.toUpperCase().split("").map(letter =>(
    <button>{ letter }</button>
  ))
  
  return (
    <section className='keyboard'>
     {alphabetElements} 
    </section>
  );
}

export default AlphabetEl;