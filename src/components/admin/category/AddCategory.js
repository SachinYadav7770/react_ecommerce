import React,{ useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

function AddCategory() {

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
                            <h4>Add Category</h4>
                        </div>
                        <form onSubmit={categorySave} id="category-form">
                            <ul>{getErrorList(categoryInput.errorList)}</ul>
                            <div className="card-body">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="category">
                                        <button className="nav-link active" id="main-tab" data-bs-toggle="tab" data-bs-target="#main-tab-pane" type="button" role="tab" aria-controls="main-tab-pane" aria-selected="true">Main</button>
                                    </li>
                                    <li className="nav-item" role="category">
                                        <button className="nav-link" id="meta-tab" data-bs-toggle="tab" data-bs-target="#meta-tab-pane" type="button" role="tab" aria-controls="meta-tab-pane" aria-selected="false">Meta</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="main-tab-pane" role="tabpanel" aria-labelledby="main-tab" tabIndex="0">
                                        
                                        <div className="form-group mb-3">
                                            <label>Slug</label>
                                            <input type="text" name="slug" className="form-control" onChange={handleInput} value={categorySave.slug} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="c_name" className="form-control" onChange={handleInput} value={categorySave.c_name} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>des</label>
                                            <textarea name="description" className="form-control" onChange={handleInput} value={categorySave.description} >
                                            </textarea>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Status</label>
                                            <input type="checkbox" name="status" value="1" />
                                        </div>
                                            
                                    </div>

                                    <div className="tab-pane fade" id="meta-tab-pane" role="tabpanel" aria-labelledby="meta-tab" tabIndex="0">
                                        <div className="form-group mb-3">
                                            <label>Meta Title</label>
                                            <input type="text" name="meta_title" className="form-control" onChange={handleInput} value={categorySave.meta_title} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Keyword</label>
                                            <input type="text" name="meta_keyword" className="form-control" onChange={handleInput} value={categorySave.meta_keyword} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Description</label>
                                            <textarea name="meta_des" className="form-control" onChange={handleInput} value={categorySave.meta_des} >
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddCategory;