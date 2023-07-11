import React from 'react'
import Context from './Context'
import { WORDS } from '../assets/data'

const Provider = ({children}) => {
  
  const wordsArr = WORDS.map(word=>{
    const wordSplit = word.split('');
    const vowels = [];
    const consonants = [];
    wordSplit.forEach((letter,i)=>{
      if(letter === 'A' ||
      letter === 'E' ||
      letter === 'I' ||
      letter === 'O' ||
      letter === 'U' ){
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
  console.log(result)
  return result;
}
// getRandomElementsFromArray(['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 3);

const insertCorrectLetter = (array, letter)=>{
  if(array.includes(letter)){
    return array;
  }else{
    const randomI = randomNumber(array.length);
    array[randomI]=letter;
    return array;
  }
}
// console.log(insertCorrectLetter(['B', 'C', 'D', 'F'], 'C'));
// console.log(insertCorrectLetter(['B', 'C', 'D', 'F'], 'H'));

  return (
    <>
    <Context.Provider
    value={{
      wordsArr,
      getRandomElementsFromArray,
      randomNumber,
      insertCorrectLetter
    }}
    >
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider