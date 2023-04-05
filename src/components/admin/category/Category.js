import React,{ useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

function Category() {

    const [categoryInput, setCategory] = useState({
        slug : '',
        c_name : '',
        description : '',
        status : '',
        meta_title : '',
        meta_keyword : '',
        meta_des : '',
        errorList : [],
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]:e.target.value });
    }

    const categorySave = (e) => {
        e.preventDefault();

        const data = {
            slug : categoryInput.slug,
            name : categoryInput.c_name,
            description : categoryInput.description,
            status : categoryInput.status,
            meta_title : categoryInput.meta_title,
            meta_keyword : categoryInput.meta_keyword,
            meta_des : categoryInput.meta_des,
        }
        
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/add-category', data).then(res => {
                // console.log(res);
                if(res.data?.result?.status === 200){
                    setCategory({...categoryInput, errorList: [res.data.result.message] });
                    document.getElementById('category-form').reset();
                } else if (res.data?.error?.status === 400){
                    setCategory({...categoryInput, errorList: res.data.error.validation_error });
                } else {
                    swal('Warning',response,'warning');
                }
            });
        });
    }
    const getErrorList = (errorLists) => {
        if(errorLists){
            let content = [];
            Object.keys(errorLists).forEach((value, index) => {
                content.push(<li key={index}>{errorLists[value]}</li>);
            })
            return content;
        }
        
      };
    return  (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <span class="h4">Category</span>
                            <Link to="/admin/add-category">
                                Add Category
                            </Link>
                        </div>

                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col"></th>
                                <th scope="col">Lorem</th>
                                <th scope="col">Ipsum</th>
                                <th scope="col">Dolor</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">
                                    <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </th>
                                <td>Sit</td>
                                <td>Amet</td>
                                <td>Consectetur</td>
                                </tr>
                                <tr>
                                <th scope="row">
                                    <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    </div>
                                </th>
                                <td>Adipisicing</td>
                                <td>Elit</td>
                                <td>Sint</td>
                                </tr>
                                <tr>
                                <th scope="row">
                                    <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                    </div>
                                </th>
                                <td>Hic</td>
                                <td>Fugiat</td>
                                <td>Temporibus</td>
                                </tr>
                            </tbody>
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;