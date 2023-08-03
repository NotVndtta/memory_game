import {useState, useEffect } from 'react'; 
import './App.css'; 
import SingleCard from './components/SingleCard'; 
const cardImages = [ 
  {"src": "/img/pr1.png", matched: false}, 
  {"src": "/img/pr2.png", matched: false}, 
  {"src": "/img/pr3.png", matched: false}, 
  {"src": "/img/pr4.png", matched: false}, 
  {"src": "/img/pr5.png", matched: false}, 
  {"src": "/img/pr6.png", matched: false}, 
] 
 
function App() { 
  const [cards, setCards] = useState([]) 
  const [turns, setTurns] = useState(0) 
  const [choiceOne, setChoiceOne] = useState(null) 
  const [choiceTwo, setChoiceTwo] = useState(null) 
  const [disabled, setDisabled] = useState(false) 
  const [gameOver, setGameOver] = useState(false); // добавляем новое состояние для конца игры
  
  const shuffleCards = () => { 
    const shuffledCards = [...cardImages, ...cardImages] 
    .sort(() => Math.random() - 0.5) 
    .map((card) => ({...card, id: Math.random() })) 
    setChoiceOne(null) 
    setChoiceTwo(null) 
    setCards(shuffledCards) 
    setTurns(0) 
    setGameOver(false); // сбрасываем состояние конца игры при новой игре
  } 
  
  console.log(cards,turns) 
  
  const handleChoice = (card) => { 
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) 
  } 
  useEffect(() => {  
    const allMatched = cards.every(card => card.matched);  
    if (allMatched) {  
      setGameOver(true);  
    }  
  }, [cards]);
 
  useEffect( () => { 
    if (choiceOne && choiceTwo){ 
      setDisabled(true) 
      if (choiceOne.src === choiceTwo.src){ 
        setCards(prevCards => { 
          return prevCards.map(card => { 
            if (card.src === choiceOne.src){ 
              return {...card, matched: true} 
            } 
            else {return card} 
          }) 
        }) 
        resetTurn() 
      } 
      else { 
        setTimeout(() => resetTurn(), 350) 
      } 
    } 
  }, [choiceOne, choiceTwo]) 
 
  const resetTurn = () => { 
    setChoiceOne(null) 
    setChoiceTwo(null) 
    setTurns(prevTurns => prevTurns + 1) 
    setDisabled(false) 
    
    // проверяем, закончилась ли игра
    if (turns >= 14) {  
      setGameOver(true);  
    }  
  } 
  
  useEffect(() => { 
    shuffleCards() 
  }, []) 
  
  
  // выводим сообщение о конце игры в зависимости от количества ходов
  const renderGameOverMessage = () => {  
    if (gameOver) {  
      return (  
        <p>{turns < 15 ? "Grats! Welcome to Belarus" : "Oh shit you are going back to Bakhmut"}</p>  
      )  
    }  
  }  
  
  return ( 
    <div className="App"> 
      <h1>Find Prigozhin</h1> 
      <button onClick={shuffleCards}> Start game</button> 
      <p>Ходы: {turns}</p> 
      {renderGameOverMessage()} {/* выводим сообщение о конце игры */} 
      <div className="card-grid"> 
        {cards.map(card => ( 
       <SingleCard  
       key={card.id}  
       card={card} 
       handleChoice = {handleChoice} 
       flipped = {card === choiceOne || card === choiceTwo || card.matched} 
       disabled={disabled || gameOver} // добавляем состояние конца игры для блокировки карт
       />  
        ) 
          )} 
        </div>    
      </div> 
  ); 
} 
 
export default App;