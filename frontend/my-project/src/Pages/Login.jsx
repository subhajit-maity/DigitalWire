import { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(){
    const navigate=useNavigate();
    const [password,setpassword]=useState('');
    const [username,setusername]=useState('');
    
    function login(){
        try{
            async function getuser(){
                const res=await axios.post('http://localhost:3000/api/v1/user/signin',{
                    username,
                    password,
                });
                if(res.status===200){
                    localStorage.setItem('token_id',res.data.token);
                   navigate('/dashboard');
                }
            }
            getuser();

        }catch(err){
            console.log(err);
        }
        
    };


    return(
        <>
        <div className="flex flex-col items-center w-screen h-screen pt-40 bg-gray-300">
        <div className="flex flex-col h-11/12 bg-neutral-50 w-80 rounded-2xl ">
        <h1 className="font-bold text-3xl self-center pt-4 pb-2.5">Login</h1>
         <Input heading="Username" setinputvalue={setusername}/>
         <Input heading="Password" setinputvalue={setpassword}/>
         <Button title="Submit" func={login}/>
         <h2 className="self-center mb-3.5">Don't have a account <Link to="/Signup">Signup</Link> </h2> 
            
         </div>
        </div>
     </>
    );
}