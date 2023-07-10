import React from 'react'
import Context from './Context'
import { WORDS } from '../assets/words'

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
console.log(wordsArr)

  return (
    <>
    <Context.Provider
    value={{
      wordsArr
    }}
    >
        {children}
    </Context.Provider>
    </>
  )
}

export default Provider