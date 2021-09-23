import EntryCard from './EntryCard'
import {useEffect, useState} from 'react'

function EntireslContainer({
    entries,
    errors,
    setUser,
    setEntries,
    setErrors,
    onLogout
}) {
    useEffect(() => {
        fetch("/me").then((response) => {
            if (response.ok) {
                response.json().then((user) => setUser(user));
            }
        });
        fetch('/entries').then(res => res.json()).then(data => {
            console.log('hi')
            console.log(data)
            console.log(errors)
            if (data.error) {
                console.log('24')
                setErrors(data.error)
            } else {
                console.log('26')
                setEntries(data)
            }
        })
    }, [])

    function logout() {
        fetch("/logout", {method: "DELETE"}).then(onLogout)
    }


    return (
        <div>
            <button onClick={logout}>Log out</button>

             {errors? errors.map(e => <div>{e}</div>):<table>{entries.map(entry => <EntryCard  key={entry.id} entry={entry} />)}</table>
        }  </div>
    );
}

export default EntireslContainer;
