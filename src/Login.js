import React, {useState} from 'react'

function Login({onLogin, setErrors}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const [loginErrors, setLoginErrors] = useState([])

    function onSubmit(e){
        e.preventDefault()
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
              setErrors(false)
              console.log('hi, logged in')
              
            }
        })
          

    }
  
    return (
        <> 
         <h1>Please Login</h1>
        <form onSubmit={onSubmit}>
        <label>
          Username
   
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
         Password
    
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
       
        <input type="submit" value="Login!" />
      </form>
      {loginErrors?loginErrors.map(e => <div>{e}</div>):null}
        </>
    )
}

export default Login;