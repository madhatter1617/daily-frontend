// import EntryCard from './EntryCard'
import {useEffect, useState} from 'react'
import Search from "./Search";
import Sidebar from "./Sidebar";
// import Content from './Content';


function EntiresContainer({
    entries,
    errors,
    user,
    setUser,
    setEntries,
    setErrors,
    onLogout
}) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [search, setSearch] = useState("")
    // const [viewEntry, setViewEntry] = useState(false) //vewing one edit at a time
    // const [entryEdit, setEntryEdit] = useState(false) //can view edit cannot view edit
    // const[newEdit, setNewEdit] =useState({}) //not sure what this is

    const [newEntry, setNewEnty] = useState(true);
    function NewClick() {
        setNewEnty(!newEntry);
        console.log({newEntry});
    }


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
            body: JSON.stringify(
                {title, entry_text: text}
            )
        }).then((response) => response.json()).then((eData) => setEntries((entry) => [
            ...entry,
            eData
        ]));
    }


    function handleDeleteEntry(id) {
        const updatedEntryArray = entries.filter((entry) => entry.id !== id);
        setEntries(updatedEntryArray);
    }


    function handleUpdate(updatedEntry) {
        const updatedEntries = entries.map((entry) => entry.id === updatedEntry.id ? updatedEntry : entry);
        setEntries(updatedEntries);
    }

    const searchedNote = () => {
        if (search.length > 0) {
            return entries.filter(entry => entry.entry_text.toLowerCase().includes(search.toLowerCase()) || entry.title.toLowerCase().includes(search.toLowerCase()) )
        }
        return entries
    }
    // const clickNote = (entry) => {
    //     setViewEntry(entry)
    // }

    // const editNote = (entryEdit) => {

    //     setEntryEdit(entryEdit)
    // }
    function newEntryPost() {
        return (
            <div>
                <form onSubmit={handleSubmit}
                    autoComplete="off">
                    <p>
                        Title here:
                    </p>
                    <input onChange={handleChangeTitle}
                        type="textTitle"
                        name="newReview"/>
                    <p>
                        Entry text here:
                    </p>
                    <input onChange={handleChangeText}
                        type="textText"
                        name="newReview"/>
                        <br/>
                    <button type="submit">Submit</button>

                    <button type="button"
                        onClick={handleCancel}>
                        Close
                    </button>
                </form>
            </div>
        )
    }

    function handleCancel() {
        setNewEnty(!newEntry);
    }


    return (
        <> {
            user ? (
                <div>

                    <h1>Welcome, {
                        user.username
                    }!</h1>
                    <p>
                        This is your own virtual journal where you can vent all you want, without any Foxs Given!
                    </p>

                    {
                    newEntry ? (
                        <button className="primary"
                            onClick={NewClick}>
                            Let it all out here!
                        </button>
                    ) : (newEntryPost())
                }

                    <p>Want to look for something specific?</p>
                    <Search setSearch={setSearch}/>
                    <Sidebar searchEntry={searchedNote()} entries={entries} setEntries={setEntries} handleDeleteEntry={handleDeleteEntry} handleUpdate={handleUpdate} /> {/* <Content viewEntry={viewEntry} setViewEntry={setViewEntry} entryEdit={entryEdit} setEntryEdit={setEntryEdit} setEntries={setEntries} entries={entries} setNewEdit={setNewEdit} newEdit={newEdit} editNote={editNote}/> */}

                    {/* <input>Add a new entry here: </input>  */}


                    <button onClick={logout}>Log out</button>


                    {/* <form onSubmit={handleSubmit} autoComplete="off" >
                <p> Title here:  </p>
                <input onChange={handleChangeTitle} type="textTitle" name="newReview" />
                <p> Entry text here:  </p>
                <input onChange={handleChangeText} type="textText" name="newReview" />
                <button type="submit">Submit</button>
            </form>
            <br />

            
            <p>Here are your journal entries!</p>

             {errors? errors.map(e => <div>{e}</div>):<div>{entries.map(entry => <EntryCard  key={entry.id} entry={entry}  setEntries={setEntries} onDelete={handleDeleteEntry} handleUpdate={handleUpdate}/>)}</div>
        }   */} </div>
            ) : (
                <p>
                    You are not logged in!
                </p>
            )
        } </>
    );
}

export default EntiresContainer;
