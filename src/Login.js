import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import './index.css';


function Login({onLogin}) {
  function notLoged(){
    return (
      <>
      <p>try again!</p>
      </>
    )
  }
  const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    // const [loginErrors, setLoginErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    

    function onSubmit(e){
        e.preventDefault()
        setIsLoading(true);
        const user = {
          username,
          password
      }

        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
         
            if(data.errors){
              console.log('hi, not logged')
              notLoged()
              // setErrors(data.errors)

            }else{
              // setUser(json)
              setIsLoading(false);
              // setErrors(false)
              console.log('hi, logged in')
              history.push("/entries");
              onLogin(data);
              
            }
        })
          

}
    
   
    return (
        <> 
         <h1 className='Pls' >Please Login</h1>
        <form onSubmit={onSubmit}>

        {/* {errors
          ? errors.map((err) => (
              <h3 style={{ color: "red" }} key={err}>
                {err}
              </h3>
            ))
          : null} */}


        <p className='username'>
          Username: 
          </p>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        
        <br />
        <p  className='password' >
         Password: 
         </p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        <br />
       
        <button  className='loginBtn' type="submit" value="Login"  >  
        {isLoading ? "Loading..." : "Login"}
         </button>
      </form>
      
      {errors.map(error => <div> {error}</div>)}
        </>
    )
}

export default Login;