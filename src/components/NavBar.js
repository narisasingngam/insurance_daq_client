import React, { Component } from 'react'
import './../styles/navbar.css'
import logo from './../image/syringe.png'
import { Link } from 'react-router-dom';

export class NavBar extends Component {

    linkCompanyDetail(){

    }

    render() {
        return (
            <div className="navbar">
                <Link to="/">
                <img className="logo" src={logo} alt="Logo" />
                </Link>
                <Link to="/companies" className="btn-company">
                <i class="fas fa-search"></i>
                    Search Company
                </Link>
            </div>
        )
    }
}

export default NavBar
