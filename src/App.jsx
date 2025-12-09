import React from 'react';
import Header from './components/Header';
import GameStatus from './components/GameStatus';
import Languages from './components/Languages';
import CurrentWord from './components/CurrentWord';
import AlphabetEl from './components/AlphabetEl';
import Button from './components/Button';

function App() {
  return (
   <main>
     <Header />
     <GameStatus />
     <Languages />
     <CurrentWord />
     <AlphabetEl />
     <Button />
   </main>
  );
}

export default App;