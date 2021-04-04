import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const CategorySection = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        const category = {
          name: data.name,
          id: data.id
        };
    
        axios
          .post("http://localhost:3002/addCategory", category)
          .then(function (response) {
            console.log("Server side result", response);
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log(category);
      };
    return (
        <div>
      <div className="input-section d-flex justify-content-center">
        <div className="book-info">
          <div className="form-section p-4">
            <h4 className="text-center">Add Category</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="name" className="form-label">
                Category Name
              </label>
              <input
                name="name"
                className="form-control"
                placeholder="Category Name"
                ref={register}
              />

              <label htmlFor="price" className="form-label">
              Category Id
              </label>
              <input
                name="id"
                className="form-control"
                placeholder="Category Id"
                ref={register}
              />
              <input
                  type="submit"
                  value="Add Book"
                  className="form-control btn btn-primary my-2"
                />
            </form>
          </div>
        </div>
      </div>
    </div>
    );
};

export default CategorySection;