import React, {useState} from 'react'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const [loginErrors, setLoginErrors] = useState([])
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
        .then(json => {
         
            if(json.error){
              console.log('hi, not logged')
              setLoginErrors(json.error)

            }else{
              // setUser(json)
              setIsLoading(false);
              setErrors(false)
              console.log('hi, logged in')
              
            }
        })
          

    }
  
    return (
        <> 
         <h1>Please Login</h1>
        <form onSubmit={onSubmit}>

        {/* {errors
          ? errors.map((err) => (
              <h3 style={{ color: "red" }} key={err}>
                {err}
              </h3>
            ))
          : null} */}


        <label>
          Username
   
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
         Password
    
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
       
        <button type="submit" value="Login"  >  
        {isLoading ? "Loading..." : "Login"}
         </button>
      </form>
      <br />
      {loginErrors?loginErrors.map(e => <div>{e}</div>):null}
        </>
    )
}

export default Login;