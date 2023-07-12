import React, { useContext } from 'react'
import Context from '../context/Context'

const End = () => {

  const {newGame, totalScore}=useContext(Context);
  return (
    <>
    <section className="end">
      <h1 className="message">Congratulations!!</h1>
      <h2 className="score">Total score: {totalScore}</h2>
      <button className='new-game btn' onClick={newGame}>New game</button>
    </section>
    </>
  )
}

export default End