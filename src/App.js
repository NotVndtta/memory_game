import { useState } from 'react';
import './App.css';
const cardImages = [
  {"src": "/img/pr1.png"},
  {"src": "/img/pr2.png"},
  {"src": "/img/pr3.png"},
  {"src": "/img/pr4.png"},
  {"src": "/img/pr5.png"},
  {"src": "/img/pr6.png"},
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0,5)
    .map((card) => ({...card, id:Math.random() }))
    setCards(shuffledCards)
    setTurns(0)
  }
  console.log(cards,turns)
  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards}> Start Game</button>
    </div>
  );
}

export default App;
