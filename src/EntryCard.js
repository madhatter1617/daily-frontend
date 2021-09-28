// import {Link} from "react-router-dom";
// import React, { useState} from 'react';

function EntryCard({entry, setEntries, entries}) {
    // const [ title, setTitle ] = useState('');
    // const [ isEditing, setIsEditing ] = useState(false);

    function listItems() {

        return (

            <div>

                <p>
                    Title: {
                    entry.title
                } </p>
                <p>
                    Text: {
                    entry.entry_text
                } </p>
                <button onClick={
                    () => handleDelete(entry.id)
                }>DELETE</button>
                {/* <button onClick={() => potato()}>EDIT</button>  */}
                <br/>
            </div>

        );

    }

    // function handlePost(e) {
    // e.preventDefault();
    // fetch('/entries', {
    // method: 'PATCH',
    // headers: {
    // 'Content-Type': 'application/json'
    // },
    // body: JSON.stringify({
    // title, entry_text
    // })
    // })
    // .then((response) => response.json())
    // .then((updatedEntries) => setEntries(updatedEntries));
    // }
    // const handleChangeTitle = (title) => {
    // setTitle(title.target.value);
    // };
    // const handleChangeText = (text) => {
    // setEntry(text.target.value);
    // };

    // function handleEditClick(review) {
    // setIsEditing(!isEditing);
    // setEntry(review.target.value);
    // return console.log('fired');
    // }

    // function handleCancel() {
    // setIsEditing(false);
    // }

    // function potato() {
    // return (
    // <div>
    // <form onSubmit={handlePost}>
    // <input onChange={handleChangeName} type="text" name="editReview" />
    // <button type="submit" value="save" onClick={handleEditClick()}>
    // Submit
    // </button>
    // <button type="button" onClick={handleCancel}>
    // Cancel
    // </button>
    // </form>
    // </div>
    // );
    //     }


    // function handleDelete(id) {
    //     fetch(`/entries/${id}`, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json'
    //           }
    //     })
    //     .then((r) => r.json())
    //     .then((deletedEntry) => {
    //         setEntries((prevEntry) => {
    //             const copyEntries = [...prevEntry];
    //             const index = copyEntries.findIndex((entry) => deletedEntry.id === entry.id);
    //             console.log('INDEX FROM DELETE REQUEST', index);
    //             copyEntries.splice(index, 1);
    //             return copyEntries;
    //         });
    //     });
    // }

    function handleDelete(id) {
        fetch(`/entries/${id}`, {
            method: 'DELETE'
        })
        .then((r) => r.json())
        .then((deletedEntry) => {
            setEntries((prevEntry) => {
                const copyEntries = [...prevEntry];
                const index = copyEntries.filter((entry) => entry.id !== id);
                console.log('INDEX FROM DELETE REQUEST', index);
                copyEntries.splice(index, 1);
                return copyEntries;
            });
        });
    }

    // const {title, entry_text} = entry
    return (
        <>{
            listItems(entries)
        } </>
    );
}

export default EntryCard;
