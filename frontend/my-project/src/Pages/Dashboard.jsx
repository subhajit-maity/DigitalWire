import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../Components/Button";

export default function Dashboard() {
     
      const tokenid=localStorage.getItem('token_id');     

      const [Balance,setBalance]=useState(0);
      const [username,setusername]=useState('');
      const [Users,setUsers]=useState([]);
      const navigate=useNavigate();

      const headers={
        'authorization':tokenid,
      }
  
     useEffect(()=> {
      const fetchdata=async ()=>{
        try{
          const res=await axios.get('http://localhost:3000/api/v1/account/balance',{headers});
         setBalance(res.data.balance);
         setusername(res.data.username);
        }catch(error){
          console.log("Some Error occurred");
        }
      }
      fetchdata();
       
      },[]);


      async function sendmoney(name,id){
        // let name=e.
        console.log(id);
        localStorage.setItem('name',name);
        localStorage.setItem('id',id);
        navigate('/send');

      }


      async function Searchtext(e){
        let name=e.target.value;
        if(name.split(' ')[0]!==''){
          try{
            const res= await axios.get('http://localhost:3000/api/v1/user/bulk?filter='+name,{headers});
            var x=[];
           //  console.log(res.data.user[0]);
           //  console.log(res.data.user.length);
            for(var a=0 ;a<res.data.user.length;a++){
             x.push(res.data.user[a]);
            }
            
            console.log(x);
   
             setUsers(x);
            
           
   
           }catch(error){
             console.log(error);
   
           }
        }else{
          setUsers([]);
        }
        
      }
   


   

    return(
    <>
        <div className="bg-gray-300">
        <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold ml-2.5 mt-4">Payments App</h1>
       
        <div className="flex mt-2">
        <p className="mr-4 mt-2.5">Hello, {username}</p>
        <div className="rounded-full bg-slate-950 mr-11 h-11 w-11 flex justify-center">
            <p className="self-center text-white">{username.charAt(0)}</p>
            </div>
        </div>
       
        </div>
        <div className="w-full h-0.5 bg-gray-500 mt-3">
        </div>

        {/* Balance */}
        <div className="mt-5 ml-5">
        <p className="font-bold">Your Balance is Rs. {Balance}</p>
        </div>
        <p className="ml-14 mt-3 font-bold">Users</p>
        <div className="flex justify-center mt-3">
            <input className="w-11/12 h-9 rounded-md pl-3" placeholder="search user..." onChange={Searchtext}></input>
        </div>
        {/* <p className="font-bold">{Users[2].name}</p> */}


        <div className="h-96 mt-5">
  {Users.map((user, index) => (

    <div className="h-20 ml-9 flex justify-between">

<div className="flex flex-row ">
  <div className="rounded-full h-6 w-8 bg-slate-950 flex justify-center">
    <p className="self-center text-white">{user.username[0].toUpperCase()}</p>
    </div>

    <div key={index} className="h-9 w-full ml-2.5 ">
      <p className="font-bold">{user.username}</p>
    </div>
    </div>

    <div className="mr-10">
    <button onClick={()=>{
                sendmoney(user.username,user._id);
            }} className="bg-slate-950 w-56 self-center mb-5 h-11 text-white rounded-md mt-2.5">Send Money</button>

    </div>
   


    </div>
  ))}
</div>


      </div>  

    </>
    );
}