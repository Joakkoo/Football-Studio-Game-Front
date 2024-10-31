// src/App.js
import React, { useState } from 'react';
import './App.css';



function App() {
    const [result, setResult] = useState(''); // Mensaje del resultado del juego
    const [isGameStarted, setIsGameStarted] = useState(false); // Controla si el juego está en curso
    const [cards, setCards] = useState({ cardA: null, cardB: null }); // Estado para las cartas

    const backendURL = 'https://football-studio-game-back.onrender.com'; // URL del backend en Render


    const startGame = async () => {
      try {
          const response = await fetch(`${backendURL}/new-game`, { method: 'POST' });
          const data = await response.json();
          setCards({ cardA: data.cardA, cardB: data.cardB });
          setResult('Nuevo juego ha comenzado! Haga su apuesta');
          setIsGameStarted(true);
      } catch (error) {
          console.error('Error starting game:', error);
          setResult('Failed to start game');
      }
  };
  
  const placeBet = async (bet) => {
      try {
          const response = await fetch(`${backendURL}/bet`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userBet: bet })
          });
          const data = await response.json();
          setResult(`Tu apuesta: ${data.userBet}. ${data.message} 
                     El resultado es: ${data.result}. Card A: ${data.cardA}, Card B: ${data.cardB}.`);
          setIsGameStarted(false);
      } catch (error) {
          console.error('Error placing bet:', error);
          setResult('Failed to place bet');
      }
  };

    return (
        <div className="App">
            <h1>Rey del partido</h1>
            <button onClick={startGame} className="button">Empezar nuevo juego</button>
            
            {isGameStarted && (
                <div>
                    <h2>Haga su apuesta!</h2>
                    <button onClick={() => placeBet('A')} className="button">Apuesta por A</button>
                    <button onClick={() => placeBet('B')} className="button">Apuesta por B</button>
                    <button onClick={() => placeBet('Empate')} className="button">Apuesta por Empate</button>
                </div>
            )}
            
            <div id="result">
                {result}
            </div>
        </div>
    );
}

export default App;
