import React, { useEffect, useState } from 'react'
import Context from './Context'
import { NUMBER_OF_OPTIONS, NUMBER_OF_ROUNDS, WORDS } from '../assets/data'
import { useNavigate } from 'react-router-dom';

const Provider = ({children}) => {

  const [totalScore, setTotalScore]=useState(0);
  const [round, setRound]=useState(0);
  const [maxRounds, setMaxRounds]=useState(0);
  const [wordsArr, setWordsArr]=useState([]);

  const navigate = useNavigate();

  const vowels = 'AEIOU';
  const vowelsArr = vowels.split('');
  const consonants = 'B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z';
  const consonantsArr = consonants.split(', ');
  
  const origWordsArr = WORDS.map(word=>{
    const wordSplit = word.split('');
    const vowels = [];
    const consonants = [];
    wordSplit.forEach((letter,i)=>{
      if(vowelsArr.includes(letter)){
        vowels.push({letter: letter, index: i});
      }else{
        consonants.push({letter: letter, index: i});
      }
    }
   )
    return {
      word: word,
      splittedWord: wordSplit,
      vowels: vowels,
      consonants: consonants
    }
  })
// console.log(wordsArr)

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
  };

  if(array.includes(letter)){
    workArr = [...array,otherLetter];
  }else{
    const randomI = randomNumber(array.length);
    array[randomI]=letter;
    workArr = [...array,otherLetter];
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
  }

  const randomArr = getRandomElementsFromArray(workArr, NUMBER_OF_OPTIONS-1);
  const result = insertCorrectLetter(randomArr, letter, gameName);

  return result;
}
// getLettersToChoose(correctLetter.letter);


const init = ()=>{
  setWordsArr(origWordsArr);
  setTotalScore(0);
  setRound(1);
  setMaxRounds(NUMBER_OF_ROUNDS < origWordsArr.length ? NUMBER_OF_ROUNDS: origWordsArr.length );
}

useEffect(()=>{
  init();
},[])

// useEffect(()=>{
//   console.log(wordsArr)
// },[wordsArr])

const newGame = ()=>{
  init();
  navigate('/');
}

  return (
    <>
    <Context.Provider
    value={{
      origWordsArr,
      wordsArr,
      setWordsArr,
      getRandomElementsFromArray,
      randomNumber,
      insertCorrectLetter,
      totalScore,
      setTotalScore,
      round,
      setRound,
      maxRounds,
      newGame,
      getWordToUse,
      getLettersToChoose
    }}
    >
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider