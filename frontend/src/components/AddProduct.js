import React from "react";
import { useNavigate } from "react-router-dom";



const AddProduct = () => {
   const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompnay] = React.useState("");
  const [error, setError] = React.useState(false);

  const addProduct = async () => {
    if (!name || !price || !company || !category) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if(result){
      navigate("/")
    }
  };

  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}

      <input
        type="text"
        placeholder="Enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        placeholder="Enter product category"
        className="inputBox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        placeholder="Enter product company"
        className="inputBox"
        value={company}
        onChange={(e) => {
          setCompnay(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button onClick={addProduct} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;

// import React from "react";

// const AddProduct=()=>{
//     const [name,setName]=React.useState('');
//     const [price, setPrice] = React.useState("");
//     const [category, setCategory] = React.useState("");
//     const [company, setCompony] = React.useState("");
//     const [error,setError]= React.useState(false);
//     //function
//     const addProduct=async ()=>{

//         // is function ki execution age nahi hogi yahi ruk jayegi
//         if(!name || !price || !category || !company )
//         {
//             setError(true);
//             return false;
//         }

//         console.log(name,price,category,company);
//         const userId=JSON.parse(localStorage.getItem('user'));
//        let result=fetch("http://localhost:5000/add-product",{
//         method:'post',
//         body:JSON.stringify({name,price,category,company,userId}),
//         headers:{
//             "Content-type":"application/json",
//             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`

//         }
//        });
//        result=await result.json();
//        console.log(result);
//     }
//     return (
//       <div className="product">
//         <h1>Add Product</h1>
//         <input
//           type="text"
//           placeholder="Enter Product Name"
//           className="inputBox"
//           val={name}
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         />
//         {error && !name && (
//           <span className="invalid-input">Enter Valid Name</span>
//         )}
//         <input
//           type="text"
//           placeholder="Enter Product Price"
//           className="inputBox"
//           val={price}
//           onChange={(e) => {
//             setPrice(e.target.value);
//           }}
//         />
//         {error && !price && (
//           <span className="invalid-input">Enter Valid Price</span>
//         )}
//         <input
//           type="text"
//           placeholder="Enter Product Category"
//           className="inputBox"
//           val={category}
//           onChange={(e) => {
//             setCategory(e.target.value);
//           }}
//         />
//         {error && !category && (
//           <span className="invalid-input">Enter Valid Category</span>
//         )}
//         <input
//           type="text"
//           placeholder="Enter Product Company"
//           className="inputBox"
//           val={company}
//           onChange={(e) => {
//             setCompony(e.target.value);
//           }}
//         />
//         {error && !company && (
//           <span className="invalid-input">Enter Valid Company</span>
//         )}
//         <button onClick={addProduct} className="appbutton">
//           Add Product
//         </button>
//       </div>
//     );
// }

// export default AddProduct;
