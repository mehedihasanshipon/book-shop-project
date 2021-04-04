import React, { useContext, useEffect, useState } from 'react';
import { CategoryContext } from '../App';

const Category = () => {
    const [categories,setCategories] = useState([])
    const [category, setCategory] = useContext(CategoryContext)
    // console.log(category);

    useEffect(()=>{
        fetch('http://localhost:3002/categories')
        .then(res=>res.json())
        .then(data=>{
            setCategories(data)
        })
    },[])
    
    return (
        <div className="container text-center">
            {
               categories && categories.map(cg => <button onClick={()=>setCategory(cg.id)} className="btn btn-primary mx-1">{cg.name}</button>)
            }
            
        </div>
    );
};

export default Category;