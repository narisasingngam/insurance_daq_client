import React, { Component } from 'react'
import './../styles/navbar.css'
import logo from './../image/syringe.png'
export class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <img className="logo" src={logo} alt="Logo" />
            </div>
        )
    }
}

export default NavBar
