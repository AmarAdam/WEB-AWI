import React, {Component} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import {DoorOpenFill, DoorClosed} from 'react-bootstrap-icons';
import { BiLogOut } from "react-icons/bi";

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {isLoggedIn: localStorage.getItem('token')}
    }

    LogOut = () => {
        console.log(localStorage.getItem('token'))
        localStorage.clear();
        console.log("c'est vide ? "+localStorage.getItem('token'))
        window.location.reload();
    }   

    render(){
        const navStyle = {
            color: 'white'
        };
        
        const isLoggedIn = this.state.isLoggedIn

        return(
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <a href="/" className="navbar-brand">
                    HandleFest
                </a>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/festivals"} className="nav-link">
                            Festivals
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/editors"} className="nav-link">
                            Editeurs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/games"} className="nav-link">
                            Jeux
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/contact"} className="nav-link">
                            Contact
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/organizers"} className="nav-link">
                            Organisateurs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/bills"} className="nav-link">
                            Facturations
                        </Link>
                    </li>
                </div>
                <p className="navbar-brand navbar-right">
                 {isLoggedIn ? 
                    <BiLogOut color="white" size={42} onClick={this.LogOut}/>
                    : 
                    <Link to={"/login"} className="nav-link">
                         <BiLogOut color="white" size={42} />
                    </Link>
                 }
                </p>
            </nav>
        );
    }
}

export default Nav;