import React from 'react'
import mealsimage from '../../assets/1306115.jpeg'
import classes from './Header.module.css';
import HeaderCart from './HeaderCart';
function Header(props) {
  return (
    <>
    <header className={classes.header}>
        <h1>Taste! Food Services</h1>
        <HeaderCart onClick={props.onShowCart}/>
            </header>
    <div className={classes['main-image']}>
        <img src={mealsimage} alt='meals picture'/>
    </div>
    </>
  )
}

export default Header