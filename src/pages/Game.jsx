import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Context from '../context/Context'
import { NUMBER_OF_OPTIONS, NUMBER_OF_ROUNDS } from '../assets/data'

const Game = () => {
    const gameName = useParams().game
    const {
      wordsArr,
      setWordsArr,
      randomNumber,
      getRandomElementsFromArray,
      insertCorrectLetter,
      totalScore,
      setTotalScore,
      round,
      setRound,
      maxRounds,
    newGame} = useContext(Context)

    const [randomWord, setRandomWord]=useState(0);
    const [wordToUse, setWordToUse]=useState({});
    const [correctLetter, setCorrectLetter]=useState({});
    const [letters, setLetters]=useState([]);
    const [correctClick, setCorrectClick]=useState({});
    const [wrongLetters, setWrongLetters]=useState([]);
    const [message, setMessage]=useState({});
    const [score, setScore]=useState(0);
    
    const navigate = useNavigate();

    const myColors = [
    {backgroundColor: 'white', color:'black', border: '1px dotted gray'}, 
    {backgroundColor: 'palegreen', color: 'green', border: '1px dotted green'}, 
    {backgroundColor: 'mistyrose', color: 'red', border: '1px dotted red', transform: 'scale(0.75)' }]

const init = ()=>{
      setRandomWord(randomNumber(wordsArr.length));
      setCorrectClick({state: false, letter: '_', class: 'missing'});
      setMessage({});
      setLetters([]);
      setWordToUse({});
      setWrongLetters([]);
      setScore(4);
    }


useEffect(()=>{
  init();
},[]);

useEffect(()=>{
  if(gameName === 'vowel'){
    const randomI = randomNumber(wordsArr[randomWord].vowels.length);
    setCorrectLetter(wordsArr[randomWord].vowels[randomI]);
  }else if(gameName === 'consonant'){
    const randomI = randomNumber(wordsArr[randomWord].consonants.length);
    setCorrectLetter(wordsArr[randomWord].consonants[randomI]);
  }
},[randomWord]);

useEffect(()=>{
  setWordToUse(getWordToUse(randomWord, correctLetter.index));
  setLetters(getLettersToChoose(correctLetter.letter));
  // console.log(1, correctLetter);
},[correctLetter])

// useEffect(()=>{
//   console.log(2, wordToUse)
// },[wordToUse])

// useEffect(()=>{
//   console.log(letters)
// },[letters])

// useEffect(()=>{
//   console.log(wordsArr)
// },[wordsArr])

    const getWordToUse = (wordIndex, letterIndex)=>{
      const wordToGuess = wordsArr[wordIndex].splittedWord.map((letter, i)=>{
        if(letterIndex === i){
          return '_';
        }else{
          return letter;
        }
      });

      const wordToUse = {
        word: wordToGuess
      }
      return wordToUse;
    };

    const getLettersToChoose = (letter) => {
      let workArr = [];
      if(gameName === 'vowel'){
        const vowels = 'AEIOU';
        workArr = vowels.split('');
      }else if(gameName === 'consonant'){
        const consonants = 'B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z';
        workArr = consonants.split(', ');
      }

      const randomArr = getRandomElementsFromArray(workArr, NUMBER_OF_OPTIONS);
      const result = insertCorrectLetter(randomArr, letter);

      return result;
    }
    // getLettersToChoose(correctLetter.letter);

    const clickedLetter = (e)=>{
      if(correctClick.state){
        return ;
      }
      else if(correctLetter.letter === e.target.textContent){
        setCorrectClick({
          state: true,
          letter: correctLetter.letter,
          class: 'correct'
        });
        setMessage({
          message: '✨🎉 Great! Correct Letter! 🎉✨',
          class: 'correct-message'
        });
        setTotalScore(totalScore + score);
        setWordsArr(wordsArr.filter((_,i)=>randomWord !== i));
      }else{
        if(wrongLetters.includes(e.target.textContent)) return ;
        setWrongLetters([...wrongLetters, e.target.textContent]);
        setMessage({
          message: 'Almost there! Please, try again...',
          class: 'wrong-message'
        });
        setScore(score-1);
      }
    }

    const nextWord = (e)=>{
      if(round < NUMBER_OF_ROUNDS){
        init();
        setRound(round+1);
      }else{
        setRound(0);
        navigate('/end');
      }
      
    }

  return (
    <>
    <section className="game">
    <h1>Game: Find the missing <span>{gameName}</span></h1>
    <h2 className='total-score'>Total score: {totalScore}</h2>
    <h2 className='rounds'>Round {round} from {maxRounds}</h2>
    <button className="new-game"  onClick={newGame}>New game</button>
    <div className="word">
    {wordToUse.word && wordToUse.word.map((letter, i)=>(
      (letter === '_')?
      <h2 key={i} className={correctClick.class}>{correctClick.letter}</h2>
      :
      <h2 key={i}>{letter}</h2>
    ))}
    </div>
    <h4>Choose a letter:</h4>
    <div className="letters">
      {letters.map((letter,i)=>(
        (correctLetter.letter === letter && correctClick.state)?
        <button key={i} onClick={clickedLetter} style={myColors[1]}>{letter}</button>
        :
        (wrongLetters.find(l=>l===letter))?
        <button key={i} onClick={clickedLetter} style={myColors[2]}>{letter}</button>
        :
        <button key={i} onClick={clickedLetter} style={myColors[0]}>{letter}</button>
))}
    </div>
    <div className={message.class}>
      {message.message}
    </div>
    {correctClick.state && (
      <>
      <div className="points">
      <h2> + {score} point{score===1?'':'s'} </h2>
      </div>
      <button className='next' onClick={nextWord}>Next word ➡</button>
      </>
    )
    }
    </section>
    </>
  )
}

export default Game