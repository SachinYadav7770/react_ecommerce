import React, { useEffect, useState } from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

import MasterLayout from "./layouts/admin/MasterLayout";

function AdminPrivateRoute({...rest}){

    const history = useHistory();
    const [Authenticated,setAuthenticated] = useState(false);
    const [Loding,setLoding] = useState(true);
    useEffect(() => {
        axios.post('/api/authenticate').then(res => {
            if(res){
                const response = res.data;
                if(!res.data.error && res.data.result.status === 200){
                    setAuthenticated(true);
                    setLoding(false);
                }
            }
        });
        return () => {
            setAuthenticated(false);
        }
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
        if(err.response.status === 401){
            swal('Warning',err.response.data.message,'warning');
            history.push('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {
            return response;
        },  function(error){
                if(error.response.status === 403){
                    swal('Warning',error.response.data.message,'warning');
                    history.push('/');
                } else if(error.response.status === 404){
                    swal('Warning','Page not found','warning');
                    history.push('/');
                }
                return Promise.reject(error);
        }

    )

    if(Loding){
        return (
            <h1>Loading...</h1>
        );
    }
    return (
        <Route {...rest}
            render = { ({props, location}) =>
                Authenticated ?
                ( <MasterLayout {...props} /> ) :
                ( <Redirect to={{pathname:"/login", state: {from: location} }} /> )
            }
        />
    );
}


export default AdminPrivateRoute;