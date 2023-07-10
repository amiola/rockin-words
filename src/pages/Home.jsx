import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <section className="home">
        <h1>Welcome to Rockin Words!</h1>
        <h2>Select game mode:</h2>
        <div className="mode-btns">
            <NavLink to='/game/consonant' className='btn'>Missing Consonant</NavLink>
            <NavLink to='/game/vowel' className='btn'>Missing Vowel</NavLink>
        </div>
    </section>
    </>
  )
}

export default Home