import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.warn(id);
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>{item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/" + item._id}>Update </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const ProductList = () => {
//   // writing state
//   const [products, setProducts] = useState([]);

//   useEffect(() => {}, []);

//   const getProducts = async () => {
//     //as this is get then no need to write header/body
//     let result = await fetch("http://localhost:5000/products",{
//         headers:{
//             // bearer is used for sending token
//             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
//         }
//     })

//     result = await result.json();
//   };

//   const deleteProduct = async (id) => {
//     let result = await fetch(`http://localhost:5000/product/${id}`, {
//       method: "Delete",
//       headers: {
//         // bearer is used for sending token
//         authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//       }
//     });
//     result = await result.json();
//     if (result) {
//       getProducts();
//       alert("Record is deleted");
//     }
//   };

//   const searchHandle = async (event) => {
//     console.log(event.target.value);
//     let key = event.target.value;
//     //after clear the search box all product have to display
//     if (key) {
//       let result = await fetch(`http://localhost:5000/search/${key}`, {
//         headers: {
//           // bearer is used for sending token
//           authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//         },
//       });
//       result = await result.json();
//       if (result) {
//         setProducts(result);
//       } else {
//         getProducts();
//       }
//     }
//   };

//   return (
//     <div className="product-list">
//       <h3>Product List</h3>
//       <input
//         className="search-product-box"
//         type="text"
//         placeholder="Search Product"
//       />
//       onChange={searchHandle}
//       <ul>
//         <li>S.NO</li>
//         <li>Name</li>
//         <li>Price</li>
//         <li>Category</li>
//         <li>Operation</li>
//       </ul>
//       {/*  when there is no result then showing on screen that no result found */}
//       {products.length>0 ? products.map((item, index) =>
//         <ul>
//           <li>{index + 1}</li>
//           <li>{item.name}</li>
//           <li>{item.price}</li>
//           <li>{item.category}</li>
//           <li>
//             <button onClick={() => deleteProduct(item._id)}>Delete</button>
//           </li>
//           <link to={"/update"+item._id}>Update</link>
//         </ul>
//       )
//       :<h1>No Result Found</h1>
//     }
//     </div>
//   );
// };

// export default ProductList;
