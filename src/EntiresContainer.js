import EntryCard from './EntryCard'
import {useEffect, useState} from 'react'

function EntiresContainer({
    entries,
    errors,
    user,
    setUser,
    setEntries,
    setErrors,
    onLogout
}) {
    const [ title, setTitle ] = useState('');
    const [ text, setText ] = useState('');
   
    useEffect(() => {
        fetch("/me").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });               
    }, []);

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
			body: JSON.stringify({ title, entry_text: text })
		})
			.then((response) => response.json())
			.then((eData) => setEntries((entry) => [ ...entry, eData ]));
	}


   


    function handleDeleteEntry(id) {
        const updatedEntryArray = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntryArray);
      }
    

    // function handleUpdateEntry(updatedEntry) {
    //     const updatedEntryArray = entries.map((entry) => {
    //       return entry.id === updatedEntry.id ? updatedEntry : entry;
    //     });
    //     setEntries(updatedEntryArray);
    //   }


    return (
    <>
        {user ? (
        <div>
            <button onClick={logout}>Log out</button>

            <h1>Welcome, {user.username}!</h1>
            
		    <p>Add a new entry here: </p>
          

            <form onSubmit={handleSubmit}>
                <p> Title here:  </p>
                <input onChange={handleChangeTitle} type="textTitle" name="newReview" />
                <p> Entry text here:  </p>
                <input onChange={handleChangeText} type="textText" name="newReview" />
                <button type="submit">Submit</button>
            </form>
            <br />
            <p>Here are your journal entries!</p>

             {errors? errors.map(e => <div>{e}</div>):<div>{entries.map(entry => <EntryCard  key={entry.id} entry={entry}  setEntries={setEntries} onDelete={handleDeleteEntry}  handleChangeText={handleChangeText} handleChangeTitle={handleChangeTitle} title={title} text={text}/>)}</div>
        }  </div>
        ) : (
            <p>
						You are not logged in!
					</p>
				)}
    </>
    );
}

export default EntiresContainer;
