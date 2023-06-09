import React, { useState } from 'react'

import { Link } from "react-router-dom";

function Home() {

    const [submit, setsubmit]=useState(false)

    let x=''
    const[display,setdisplay]=useState("")
    const[form,setform]=useState({email:"",password:""})
    const[err,seterr]=useState({email:{isValid:true,message:""},password:{isValid:true,message:""} })

  const isDisable=form.email.length  && form.password.length ;
      
            const displaying=(event)=>{
              event.preventDefault();  // it will not refresh the screen again and again on click on submit
              
              if(isDisable>0){
                alert("Congrats !! Your form is submitted")
                setform({name:"",email:"",gender:"",number:"",password:""})
                x=form.email.split("@")
               setdisplay(<h1>Hello {x[0]}</h1>)
              }
              else{
                alert("all fields are mandatory")
                setsubmit(true)
              }
             
            }
           
        const checkerr=(type)=>{
          switch(type){
               case "email":
                const regExxx =/[a-z]@/
                if(!regExxx.test(form.email)){
                        seterr({...err,email:{isValid: false,message:"email must contain @"}})
                }else{
                    seterr({...err, email:{isValid:true,message:""}    })
                }
                  break;

               case "password":
                if(form.password.length<6){
                  seterr({...err,password:{isValid: false,message:"Password must contain atleast 6 letters"}})
                }else{
                  seterr({...err, password:{isValid:true,message:""}    })
                }
               break;
          }
       }
   
    
  return (
    <div id="main">
    <div><h1> VALIDATION FORM</h1> </div><br/>
    <form><br/>
       
   
    {!err.email.isValid ? <div style={{color:"red"}}>   {err.email.message}</div> : null}
    <label htmlFor="email" >Email: </label>
    <input data-testid = 'email' id="email" type="email"  onChange={(event)=>{setform({...form,email:event.target.value})}}
      onBlur={(event)=>{checkerr("email")}} value={form.email}  /><br/><br/>
    

    
    {!err.password.isValid ? <div style={{color:"red"}}>   {err.password.message}</div> : null}
    <label htmlFor="password" >Password: </label>
    <input id="password" data-testid = 'password' type='password'  onChange={(event)=>{setform({...form,password:event.target.value})}}
      onBlur={(event)=>{checkerr("password")}} value={form.password} /><br/><br/>
    
    
    {
        submit? <button data-testid = 'submit' type="button" onClick={displaying}  > submit</button>
        : <button data-testid = 'submit' type="button" onClick={displaying}  > <Link to="/TodoApp"> Submit</Link></button>
    }
   
    
    </form>
</div>
  )
}

export default Home
