// export default SignUp;
import React, { useState ,useEffect} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  // if we already have users information saved then user 
  // cant access the signup page
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const collectData = async () => {
    console.log(name, email, password);

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    result = await result.json();
    console.log(result);

    // for storing data in local storage
    localStorage.setItem("user", JSON.stringify(result));
localStorage.setItem("token", JSON.stringify(result.auth));

    // navigatign to the root path after signup
    navigate("/");
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputBox"
        type="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={collectData} className="appButton" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;









// import React, { useState } from "react";

// const SignUp = () => {
//   // here we are taking 3 states for getting the value of 3 boxes
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
  
 
//   // const collectData = async () => {
//   //   console.log(name, email, password);
//   //   // fetch is called a API url,method,body,header
//   //   // API cant take object directly it takes in the form of string
//   //   let result = await fetch("http://localhost:5000/register", {
//   //     method: "post",
//   //     headers: {
//   //       "Content-Type": "aplication/json",
//   //     },
//   //     body: JSON.stringify({ name: name, email: email, password:password})
//   //   });
//   //   result=await result.json()
//   //   console.log(result);
    
//   // };

//   const collectData = async () => {
//     console.log(name, email, password);

//     // The 'Content-Type' header should be set to 'application/json' instead of 'aplication/json'.
//     // Also, there's a typo in the word 'application'.
//     let result = await fetch("http://localhost:5000/register", {
//       method: "post",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // The body should be an object with properties 'name', 'email', and 'password',
//       // rather than a string with variables 'name', 'email', and 'password'.
//       // JSON.stringify() can be used to convert the object to a string.
//       body: JSON.stringify({ name, email, password }),
//     });

//     // The response from the backend should also be parsed as JSON using await result.json().
//     result = await result.json();
//     console.log(result);
//   };

  

//   return (
//     <div className="register">
//       <h1>Register</h1>
//       <input
//         className="inputBox"
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter Name"
//       />
//       <input
//         className="inputBox"
//         type="text"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter Email"
//       />
//       <input
//         className="inputBox"
//         type="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Enter Password"
//       />
//       <button onClick={collectData} className="appButton" type="button">
//         SignUp
//       </button>
//     </div>
//   );
// };