import React from 'react'
import {NavLink} from 'react-router-dom';
import '../App.css'

const Navigation = () => {
  return (
    <nav className = 'navigation'>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName='active'>
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/home" activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/account" activeClassName='active'>
            Acoount
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/signin" activeClassName='active'>
            Sign-In
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
