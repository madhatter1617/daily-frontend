import './App.css';
import Nav from './Nav';
import Auth from './Auth'
import Login from './Login'

import React, {useState, useEffect} from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';

function App() {
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [bakeItems, setBakeItems] = useState([]);

    // getting the user for state
    useEffect(() => {
        fetch('/users').then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
    }, []);

    // getting bakery items
    // useEffect(() => {
    // fetch('/bakeries').then((r) => r.json()).then((item) => {
    // setBakeItems(item);
    // });
    // }, []);

    function handleLogin(user) {
        setUser(user);
    }

    function handleLogout() {
        setUser(null);
        setReviews(null);
    }
    // nned to change to get the entry
    // useEffect(() => {
    // fetch('/reviews').then((response) => {
    // console.log('RESPONSE FROM GET REVIEWS', response);
    // response.json().then((review) => {
    // console.log('GET REQUEST TO REVIEWS APP.JS', review);
    // setReviews(review);
    // });
    // });
    // }, []);


    console.log('JUST BEFORE RETURN', reviews);
    return (
        <div className="App">

            {/* <Header user={user} onLogout={handleLogout} reviews={reviews} setReviews={setReviews} /> */}
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Nav/>
                    </Route>
                    <Route path="/sign_up">
                        <Auth/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;


// function App() {
// return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
// );
// }

// export default App;
