function Button(props){

    return(
        <>
            <button onClick={()=>{
                console.log("Here");
                props.func();
            }} className="bg-slate-950 w-56 self-center mb-5 h-11 text-white rounded-md mt-2.5">{props.title}</button>
        </>
    );
}
export default Button;