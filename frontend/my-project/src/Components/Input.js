
function Input(props){


    const handleInputChange=(e)=>{
        props.setinputvalue(e.target.value);
        console.log(e.target.value);
    }

    return(
        <>
        <label className="ml-5">{props.heading}</label>
                    <div className="mt-1 mt-1.5 mb-4 ml-3.5 self-center w-72">
                   <input placeholder="Enter text" className="h-10 w-64 border-2 rounded-md border-gray-300 ml-1.5" onChange={
                   handleInputChange
                   }></input>
                   </div>
                   
        </>
            );
};
export default Input;