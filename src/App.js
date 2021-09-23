import './App.css';
import Nav from './Nav';
import Auth from './Auth'
import Login from './Login'
import {Link} from "react-router-dom";

import React, {useState, useEffect} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import EntireslContainer from './EntireslContainer';

function App() {
    const [user, setUser] = useState(null);
    const [entries, setEntries] = useState([]);
    const [errors, setErrors] = useState(false)


    // getting the user for state
    useEffect(() => {
        fetch("/me").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, []);
    // this is for the entries form which is not made yet
    function handlePost(obj) {
        fetch('/entries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => res.json()).then(data => {
            console.log('hi')
            console.log(data)
            if (data.ok) {
                setErrors(data.errors)
            } else {
                setEntries([
                    ...entries,
                    data
                ])
            }
        })
    }
    function onLogout() {
        setEntries([])
        setUser(false)
    }


    console.log('JUST BEFORE RETURN', entries);
    return (
        <div className="App">


            <BrowserRouter>
                <Switch>

                    <Route exact path="/">
                        <Nav/>
                    </Route>
                    <Route path="/sign_up">
                        <Auth/>
                        <button>
                            <Link to="/">
                                ZeroGiven</Link>
                        </button>
                        <button>
                            <Link to="/entries">
                                ZeroFoxsGiven</Link>
                        </button>
                    </Route>
                    <Route path="/login">
                        <Login/>
                        <button>
                            <Link to="/">
                                ZeroGiven</Link>
                        </button>
                        <button>
                            <Link to="/entries">
                                ZeroFoxsGiven</Link>
                        </button>
                    </Route>
                    <Route path="/entries">
                        <EntireslContainer errors={errors}
                            entries={entries}
                            setUser={setUser}
                            setErrors={setErrors}
                            setEntries={setEntries}
                            onLogout={onLogout}
                            user={user}/>
                        <button>
                            <Link to="/">
                                ZeroGiven</Link>
                        </button>

                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
