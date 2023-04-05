import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

function Navbar() {

    let AuthButton = '';
    const history = useHistory();

    const Logout = (e) => {
        e.preventDefault();

        axios.post('/api/logout').then(res => {
            if(res){
                const response = res.data;
                if(!response.error && response.result.status === 200){
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_name');
                    swal('Success',response.result.message,'success');
                    history.push('/');
                } else {
                    swal('Warning',response.error.message,'warning');
                }
            }
        });
    }

    if(localStorage.getItem('auth_token')){
        AuthButton = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <button onClick={Logout} className='btn btn-danger'>Logout</button>
                </li>
            </ul>
        );
    }else{
        AuthButton = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/registration">Register</Link>
                </li>
            </ul>
        );
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">

                <Link className="navbar-brand" to="#">Ecom Project</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/collections">Collection</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li> */}
                        {AuthButton}
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;