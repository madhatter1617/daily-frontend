import React, {useState} from 'react'
import { useHistory } from "react-router-dom";


function Auth({user, setUser}) {
  const history = useHistory();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    const [errors, setErrors] = useState([])

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username: username,
            password
        }
       
        fetch(`/users`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        // .then(res => res.json())
        // .then(json => {
        //     console.log(json.error)
        //     if(json.error) setErrors(json.error)
        //     history.push("/");
        // })
        .then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user));
              history.push("/");
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
        
    }
    return (
        <> 
        <h1>Please Sign-up!</h1>
        <form onSubmit={onSubmit}>
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
        <button type="submit" value="Sign up!">Sign up! </button>
      </form>
      <br />
      {errors?errors.map(e => <div>{e}</div>):null}
        </>
    )
}

export default Auth;