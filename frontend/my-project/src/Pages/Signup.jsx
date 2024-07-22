import Input from "../Components/Input";
import Button from "../Components/Button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
    const navigate=useNavigate();
    const [username,setusername]=useState('');
    const [firstname,setfirstsname]=useState('');
    const [lastname,setlastname]=useState('');
    const [password,setpassword]=useState('');
    const [email,setemail]=useState('');
    const [errors,seterrors]=useState(false);

    async function postdata (){
        try{
            if(firstname!=='' && lastname!=='' && password!=='' && email!==''){
               const res= await axios.post('http://localhost:3000/api/v1/user/signup',{
                username,
                firstname,
                lastname,
                password,
                email
               });
               console.log(res.data);
               if(res.status===200){
                const tken=res.data.tokenid;
                console.log(res.data);
                console.log(res.data.tokenid);
                localStorage.setItem('token_id',tken);
                navigate('/dashboard');
               }
            }
        }catch(error){
            seterrors((errors)=>{
                errors=true;
            });
        }
    }    


    return (
        <>
        {
            errors===true ?
             <div>Somerror Occured  </div>: 

            <div className="flex flex-col items-center w-screen h-screen pt-36 bg-gray-300">
           <div className="flex flex-col h-11/12 bg-neutral-50 w-80 rounded-2xl ">
           <h1 className="font-bold text-3xl self-center pt-4 pb-2.5">Signup</h1>
            <Input heading="Username" setinputvalue={setusername}/>
            <Input heading="First Name" setinputvalue={setfirstsname}/>    
            <Input heading="Last Name" setinputvalue={setlastname}/>   
            <Input heading="Email" setinputvalue={setemail}/>
            <Input heading="Password" setinputvalue={setpassword}/>
            <Button title="Submit" func={postdata}/>
            <h2 className="self-center mb-3.5">Already have a account <Link to="/login">Login</Link> </h2> 

            </div>
           </div>
           }
           
        </>
    );
}

