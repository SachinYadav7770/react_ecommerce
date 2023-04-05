import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Registration() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name : '',
        email : '',
        password : '',
        errorList : [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]:e.target.value });
    }

    const registerSumbit = (e) => {
        e.preventDefault();

        const data = {
            name : registerInput.name,
            email : registerInput.email,
            password : registerInput.password,
        }
        // console.log(data);
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.userName);
                    swal('Success',res.data.message,'success');
                    history.push('/');
                } else {
                    setRegister({...registerInput, errorList: res.data.validation_error });
                }
            });
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSumbit}>
                                    <div className="form-group mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" className="form-control" onChange={handleInput} value={registerInput.name} />
                                        <span>{registerInput.errorList.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input type="text" name="email" className="form-control" onChange={handleInput} value={registerInput.email}  />
                                        <span>{registerInput.errorList.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="text" name="password" className="form-control" onChange={handleInput} value={registerInput.password}  />
                                        <span>{registerInput.errorList.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;