import EntryCard from './EntryCard'
import {useEffect, useState} from 'react'

function EntireslContainer({
    // entries,
    errors,
    user,
    setUser,
    // setEntries,
    setErrors,
    onLogout
}) {
    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');
    const  [entries, setEntries] = useState([]);
    useEffect(() => {
        fetch("/me").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });               
    }, []
)

useEffect(() => {
    fetch('/entries').then((response) => {
        console.log('RESPONSE FROM GET entries', response);
        response.json().then((entry) => {
            console.log('GET REQUEST TO REVIEWS APP.JS', entry);
            setEntries(entry);
        });
    });
}, []);

    function logout() {
        fetch("/logout", {method: "DELETE"}).then(onLogout)
    }

    // function listItems() {       
        
    //     console.log(entries)
    //     return entries.map((e) => (
            
    //         <div>
                
    //             <p> {e.title} </p>
    //             <p> {e.entry_text} </p>
    //             <button onClick={() => handleDelete(e.id)}>DELETE</button>
    //             {/* <button onClick={() => potato()}>EDIT</button> */}
    //         </div>
            
    //     ));
        
    // }

    // function handleDelete(id) {
    //     fetch(`/entries/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then((r) => r.json())
    //         .then((deletedEntry) => {
    //             setEntries((prevEntry) => {
    //                 const copyEntries = [ ...prevEntry ];
    //                 const index = copyEntries.findIndex((entry) => deletedEntry.id === entry.id);
    //                 console.log('INDEX FROM DELETE REQUEST', index);
    //                 copyEntries.splice(index, 1);
    //                 return copyEntries;
    //             });
    //         });
    // } 

    const handleChangeTitle = (title) => {
		setTitle(title.target.value);
	};

    const handleChangeText = (text) => {
		setText(text.target.value);
	};

    function handleSubmit(e) {
		e.preventDefault();
		fetch('/entries', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ title: title, entry_text: text })
		})
			.then((response) => response.json())
			.then((eData) => setEntries((entry) => [ ...entry, eData ]));
	}

    return (
    <>
        {user ? (
        <div>
            <button onClick={logout}>Log out</button>

            <h1>Welcome, {user.username}!</h1>
            
			{/* {listItems(entries)} */}
            <p>Add a new entry here: </p>
            <br />

            <form onSubmit={handleSubmit}>
                <input onChange={handleChangeTitle} type="textTitle" name="newReview" />
                <input onChange={handleChangeText} type="textText" name="newReview" />
                <button type="submit">Submit</button>
            </form>
            <p>Here are your journal entries!</p>

             {errors? errors.map(e => <div>{e}</div>):<table>{entries.map(entry => <EntryCard setEntries={setEntries} entries={entries} key={entry.id} entry={entry} />)}</table>
        }  </div>
        ) : (
            <p>
						You are not logged in!
					</p>
				)}
    </>
    );
}

export default EntireslContainer;
