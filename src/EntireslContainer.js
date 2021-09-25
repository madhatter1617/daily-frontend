import EntryCard from './EntryCard'
import {useEffect, useState} from 'react'

function EntireslContainer({
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
    }, []
)

    function logout() {
        fetch("/logout", {method: "DELETE"}).then(onLogout)
    }

    function listItems() {
        return entries.map((e) => (
            <div>
                <p> {e.title} </p>
                <p> {e.entry_text} </p>
                <button onClick={() => handleDelete(e.id)}>DELETE</button>
                {/* <button onClick={() => potato()}>EDIT</button> */}
            </div>
        ));
    }

    function handleDelete(id) {
        fetch(`/entries/${id}`, {
            method: 'DELETE'
        })
            .then((r) => r.json())
            .then((deletedEntry) => {
                setEntries((prevEntry) => {
                    const copyEntries = [ ...prevEntry ];
                    const index = copyEntries.findIndex((entry) => deletedEntry.id === entry.id);
                    console.log('INDEX FROM DELETE REQUEST', index);
                    copyEntries.splice(index, 1);
                    return copyEntries;
                });
            });
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
			body: JSON.stringify({ title: title, entry_text: text })
		})
			.then((response) => response.json())
			.then((eData) => setEntries((entry) => [ ...entry, eData ]));
	}
//re look over this
// function getEntries(){
//     fetch(`/entries/${id}`).then(res => res.json()).then(data => {
//         // console.log('hi')
//         // console.log(data)
//         // console.log(errors)s
//         if (data.error) {
//             // console.log('24')
//             setErrors(data.error)
//         } else {
//             // console.log('26')
//             setEntries(data)
//         }
//     })
// }

    return (
    <>
        {user ? (
        <div>
            <button onClick={logout}>Log out</button>

            <h1>Welcome, {user.username}!</h1>
            <p>Here are your journal entries!</p>
			{listItems(entries)}

            <br />

            <form onSubmit={handleSubmit}>
                <input onChange={handleChangeTitle} type="textTitle" name="newReview" />
                <input onChange={handleChangeText} type="textText" name="newReview" />
                <button type="submit">Submit</button>
            </form>


             {errors? errors.map(e => <div>{e}</div>):<table>{entries.map(entry => <EntryCard  key={entry.id} entry={entry} />)}</table>
        }  </div>
        ) : (
            <p>
						IDK What to put here
					</p>
				)}
    </>
    );
}

export default EntireslContainer;
