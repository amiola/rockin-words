import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Context from '../context/Context'

const Game = () => {
    const gameName = useParams().game
    const {wordsArr} = useContext(Context)

    const [randomWord, setRandomWord]=useState(0);
    const [wordToUse, setWordToUse]=useState();

useEffect(()=>{
  setRandomWord(Math.floor(Math.random()*wordsArr.length));
},[]);

    const getWordToUse = ()=>{
      
      var letterIndex = '';
      var correctLetter = '';
      if(gameName === 'vowel'){
        const randomI = Math.floor(Math.random()*wordsArr[randomWord].vowels.length);
        letterIndex = wordsArr[randomWord].vowels[randomI].index;
        correctLetter = wordsArr[randomWord].vowels[randomI];
      }else if(gameName === 'consonant'){
        const randomI = Math.floor(Math.random()*wordsArr[randomWord].consonants.length);
        letterIndex = wordsArr[randomWord].consonants[randomI].index;
        correctLetter = wordsArr[randomWord].consonants[randomI];
      }

      const wordToGuess = wordsArr[randomWord].splittedWord.map((letter, i)=>{
        if(letterIndex === i){
          return '_';
        }else{
          return letter;
        }
      });

      const wordToUse = {
        word: wordToGuess,
        correctLetter: correctLetter
      }
      console.log(wordToUse)
      return wordToUse;
    };


    const getLettersToChoose = () => {
      if(gameName === 'vowel'){
        const vowels = 'AEIOU';
        const vowelsArr = vowels.split('');
        return vowelsArr;
      }else if(gameName === 'consonant'){
        const consonants = 'B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z';
        const consArr = consonants.split(', ');

      }
    }

  return (
    <>
    <section className="game">
    <h1>Game: {gameName}</h1>
    <div className="word">
    {getWordToUse().word.map((letter, i)=>(
      <h2 key={i}>{letter}</h2>
    ))}
    </div>
    </section>
    </>
  )
}

export default Game