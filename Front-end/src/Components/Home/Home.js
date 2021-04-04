import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../App";
import Category from "../../CategoryUi/Category";
import Card from "../Card/Card";
import SearchSection from "../SearchSection/SearchSection";

const Home = () => {
  
  const [filteredData,setFilteredData] = useState([]);
  const [books, setBooks] = useState(filteredData);
  const [category, setCategory] = useContext(CategoryContext);


  useEffect(()=>{
    fetch("http://localhost:3002/books")
      .then((res) => res.json())
      .then((data) => {
        const matchProduct = data.filter(pd => pd.category === category);
        setFilteredData(data)
        setBooks(matchProduct)
      })
  },[category])
  
  // console.log({books});
  // console.log('Filter data',filteredData);

  useEffect(() => {
    fetch("http://localhost:3002/books")
      .then((res) => res.json())
      .then((data) => {
        setFilteredData(data)
        setBooks(data)
      })
      
  }, []);

 

  const handleSearch = (event) =>{
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = filteredData.filter((data) => {
      console.log("inside",data);
    return data.name.toLowerCase().search(value) !== -1;
    });
    setBooks(result);
  }
  
  return (
    <div>
      <SearchSection handleSearch={handleSearch} />
      <Category />
      <div className="container">
        <div className="row ">
          {books.length === 0 && (
            <div class="d-flex justify-content-center">
              <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {books.map((book) => (
            <Card book={book} />
          ))}
          
        </div>
      </div>
    </div>
  );
};

export default Home;
