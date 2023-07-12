import React, { useEffect, useState } from 'react'
import Context from './Context'
import { NUMBER_OF_OPTIONS, NUMBER_OF_ROUNDS, WORDS } from '../assets/data'
import { useNavigate } from 'react-router-dom';

const Provider = ({children}) => {

  const [totalScore, setTotalScore]=useState(0);
  const [round, setRound]=useState(0);
  const [maxRounds, setMaxRounds]=useState(0);
  const [maxWords, setMaxWords]=useState(5);
  const [wordsArr, setWordsArr]=useState([]);
  const [game, setGame]=useState(0);

  const navigate = useNavigate();

  const vowels = 'AEIOU';
  const vowelsArr = vowels.split('');
  const consonants = 'B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z';
  const consonantsArr = consonants.split(', ');
  const allLettersArr = [...vowelsArr, ...consonantsArr];

  //Sounds
  let correctSound = new Audio('/sounds/correct-ping.mp3');
  let wrongSound = new Audio('/sounds/error.mp3');
  let winSound = new Audio('/sounds/win.mp3');
  let nextSound = new Audio('/sounds/next.mp3');
  let gameSound = new Audio('/sounds/game.mp3');
  
  const getWordsArr =()=>{
    const wordsArr = WORDS[game].map(word=>{
      const wordSplit = word.split('');
      const vowels = [];
      const consonants = [];
      const allLetters = [];
      wordSplit.forEach((letter,i)=>{
        if(vowelsArr.includes(letter)){
          vowels.push({letter: letter, index: i});
        }else{
          consonants.push({letter: letter, index: i});
        }
        allLetters.push({letter: letter, index: i});
      }
     )
      return {
        word: word,
        splittedWord: wordSplit,
        vowels: vowels,
        consonants: consonants,
        allLetters: allLetters
      }
    })
    return wordsArr;
  }

  useEffect(()=>{
    setWordsArr(getWordsArr());
    setMaxWords(getWordsArr().length);
  },[game])
  

const randomNumber = (arrLength)=>{
  const random = Math.floor(Math.random() * arrLength);
  return random;
}

function getRandomElementsFromArray(array, numElements) {
  if (numElements >= array.length) {
    return array;
  }
  
  const result = [];
  const indices = new Set();

  while (indices.size < numElements) {
    const randomIndex = randomNumber(array.length);
    indices.add(randomIndex);
  }

  for (const index of indices) {
    result.push(array[index]);
  }
  // console.log(result)
  return result;
}
// getRandomElementsFromArray(['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 3);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i

    // Swap array[i] with array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}


const insertCorrectLetter = (array, letter, gameName)=>{
  
  let otherLetter;
  let workArr;

  if(gameName === 'vowel'){
    otherLetter = consonantsArr[randomNumber(consonantsArr.length)];
  }else if(gameName === 'consonant'){
    otherLetter = vowelsArr[randomNumber(vowelsArr.length)];
  }

if(gameName === 'vowel' || gameName === 'consonant'){
  if(array.includes(letter)){
    workArr = [...array,otherLetter];
  }else{
    const randomI = randomNumber(array.length);
    array[randomI]=letter;
    workArr = [...array,otherLetter];
  }
}else if(gameName === 'cvc-words'){
  if(array.includes(letter)){
    workArr = array;
  }else{
    const randomI = randomNumber(array.length);
    array[randomI]=letter;
    workArr = array;
  }
}
  const newArr = shuffleArray(workArr);
  return newArr;
}
// console.log(insertCorrectLetter(['B', 'C', 'D', 'F'], 'C'));
// console.log(insertCorrectLetter(['B', 'C', 'D', 'F'], 'H'));

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

const getLettersToChoose = (letter, gameName) => {
  let workArr = [];
  
  if(gameName === 'vowel'){
    workArr = vowelsArr;
  }else if(gameName === 'consonant'){
    workArr = consonantsArr;
  }else if(gameName === 'cvc-words'){
    workArr = allLettersArr;
  }

  const randomArr = getRandomElementsFromArray(workArr, gameName === 'cvc-words'? NUMBER_OF_OPTIONS: NUMBER_OF_OPTIONS-1);
  const result = insertCorrectLetter(randomArr, letter, gameName);

  return result;
}
// getLettersToChoose(correctLetter.letter);


const init = ()=>{
  // setWordsArr(origWordsArr);
  setTotalScore(0);
  setRound(1);
  setMaxRounds(NUMBER_OF_ROUNDS < maxWords ? NUMBER_OF_ROUNDS: maxWords );
}

useEffect(()=>{
  init();
},[])

useEffect(()=>{
  console.log(wordsArr)
},[wordsArr])

const newGame = ()=>{
  init();
  navigate('/');
  nextSound.play();
}

  return (
    <>
    <Context.Provider
    value={{
      wordsArr, setWordsArr,
      getRandomElementsFromArray,
      randomNumber,
      insertCorrectLetter,
      totalScore, setTotalScore,
      round, setRound,
      maxRounds,
      newGame,
      getWordToUse,
      getLettersToChoose,
      game, setGame,
      correctSound, wrongSound, winSound, nextSound, gameSound
    }}
    >
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider