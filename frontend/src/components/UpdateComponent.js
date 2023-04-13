import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompnay] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompnay(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    result = await result.json();
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;

// import React, { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const UpdateProduct = () => {
//   const [name, setName] = React.useState("");
//   const [price, setPrice] = React.useState("");
//   const [category, setCategory] = React.useState("");
//   const [company, setCompony] = React.useState("");
//   const [error, setError] = React.useState(false);
//   const params = useParams();
//   const navigate = useNavigate();

//   // for getting id once when page is load
//   // here we are using array for calling only one time
//   useEffect(() => {
//     // function which is calling api
//     getProductDetails();
//   }, []);

//   const getProductDetails = async () => {
//     console.log(params);
//     let result = await fetch(`http://localhost:5000/product/${params.id}`, {
//       headers: {
//         // bearer is used for sending token
//         authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
//       }
//     });
//     //result is in the promise form
//     result = await result.json();
//     // fields ke andar data ko set karna hai
//     setName(result.name);
//     setPrice(result.price);
//     setCategory(result.category);
//     setCompony(result.company);
//   };

//   //function
//   const updateProduct = async () => {
//     console.log(name, price, category, company);
//     let result = fetch(`http://localhost:5000/product/${params.id}`, {
//       method: "Put",
//       body: JSON.stringify({ name, price, category, company }),
//       headers: {
//         "content-type": "application/json",
//         authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,

//       }
//     });
//     result = await result.json();
//     console.log(result);
//     navigate("/");
//   };
//   return (
//     <div className="product">
//       <h1>Update Product</h1>
//       <input
//         type="text"
//         placeholder="Enter Product Name"
//         className="inputBox"
//         val={name}
//         onChange={(e) => {
//           setName(e.target.value);
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Enter Product Price"
//         className="inputBox"
//         val={price}
//         onChange={(e) => {
//           setPrice(e.target.value);
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Enter Product Category"
//         className="inputBox"
//         val={category}
//         onChange={(e) => {
//           setCategory(e.target.value);
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Enter Product Company"
//         className="inputBox"
//         val={company}
//         onChange={(e) => {
//           setCompony(e.target.value);
//         }}
//       />

//       <button onClick={updateProduct} className="appbutton">
//         Update Product
//       </button>
//     </div>
//   );
// };

// export default UpdateProduct;
