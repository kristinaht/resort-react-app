import React, { Component } from 'react'
import logo from '../images/logo.svg'
// import { FaAlignRight } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  state = {
    isOpen: false
  }

  handleToggle = () => {
    this.setState({isOpen: !this.state.isOpen}) //setting state to opposite of current state.
  }

  render() {
    return (
      <nav className='navbar'>
        <div className='nav-center'>
          <div className='nav-header'>
            <Link to='/'>
              <img src={logo} alt='beach resort' />
            </Link>
            <button type='button' className='nav-btn'
              onClick={this.handleToggle}>
            <FontAwesomeIcon icon = { faAlignRight} className='nav-icon' />
            </button>
          </div>
          <ul  className={ this.state.isOpen? 'nav-links show-nav' : 'nav-links' }>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
            <Link to='/rooms'>Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}
