import React, {useState} from 'react'

function Login({onLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const [loginErrors, setLoginErrors] = useState([])

    function onSubmit(e){
        e.preventDefault()
           
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(user => {
          console.log('hi')
          console.log('LOGIN POST REQUEST', user);
          onLogin(user);

            // if(user.error){
            //   setLoginErrors(user.error)
            // }else{
              
            //   setLoginErrors(false)
            // }
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