import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../../layouts/frontend/Navbar';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


function Login() {
    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email : '',
        password : '',
        errorList : [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]:e.target.value });
    }

    const loginSumbit = (e) => {
        e.preventDefault();

        const data = {
            email : loginInput.email,
            password : loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login', data).then(res => {
                if(res){
                    const response = res.data;
                    if(!response.error && response.result.status === 200){
                        localStorage.setItem('auth_token', response.result.token);
                        localStorage.setItem('auth_name', response.result.userName);
                        swal('Success',response.result.message,'success');
                        history.push('/');
                    } else if (response.error.validation_error){
                        setLogin({...loginInput, errorList: response.error.validation_error });
                    } else {
                        swal('Warning',response.error.message,'warning');
                    }
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
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSumbit}>
                                    <div className="form-group mb-3">
                                        <label>Email ID</label>
                                        <input type="email" name="email" className="form-control" onChange={handleInput} value={loginSumbit.email} />
                                        <span>{loginInput.errorList.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" className="form-control" onChange={handleInput} value={loginSumbit.password} />
                                        <span>{loginInput.errorList.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;