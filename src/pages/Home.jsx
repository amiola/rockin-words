import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Context from '../context/Context'

const Home = () => {

  const {setGame, gameSound}=useContext(Context);

  const goToGame = (game)=>{
    setGame(game);
    gameSound.play();
  }

  return (
    <>
    <section className="home">
        <h1>Welcome to Rockin' Words!</h1>
        <h2>Select game mode:</h2>
        <div className="mode-btns">
            <NavLink to='/game/cvc-words' className='btn c1' onClick={()=>{goToGame(0)}}>CVC Words</NavLink>
            <NavLink to='/game/consonant' className='btn c2' onClick={()=>{goToGame(1)}}>Missing Consonant</NavLink>
            <NavLink to='/game/vowel' className='btn c3' onClick={()=>{goToGame(1)}}>Missing Vowel</NavLink>
        </div>
    </section>
    </>
  )
}

export default Home