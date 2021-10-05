import React, { useState } from 'react';
function EntryCard({entry, setEntries, onDelete, onUpdate, handleChangeTitle, handleChangeText, handleSubmitEdit, text, title, handleUpdate, setText, setTitle}) {
    // const { id, title, text } = entry;
    const { id } = entry;
    // const [ isEditing, setIsEditing ] = useState(false);


    // const [isEditMode, setIsEditMode] = useState(false);
    // function handleEditClick() {
    //   setIsEditMode(!isEditMode);
    //   console.log({ isEditMode });
    // }

    function handleDeleteClick() {
        fetch(`/entries/${id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            onDelete(id);
          }
        });
      }

   
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
                <button onClick={handleDeleteClick}> DELETE</button>
                 
                {/* <button onClick={handleSubmitEdit}> EDIT</button>  */}
                <br/>
                <br />
               
            </div>

        );

    }
    function handleSubmitEdit(e) {
		e.preventDefault();
        fetch(`/entries/${entry.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ title, entry_text: text })
		})
			.then((r) => r.json())
			.then(handleUpdate);
	}


    return (
        <div>
            {listItems(entry)}
            <form onSubmit={handleSubmitEdit}>
                <p> Edit Title here:  </p>
                <input onChange={(e) => {handleChangeTitle(e)}} type="textTitle" name="newTitle" value={setTitle} />
                <p> Edit Entry text here:  </p>
                <input onChange={(e) => {handleChangeText(e)}} type="textText" name="newText" value={setText} />
                <button type="submit">Save edit </button>
            </form>
        
         </div>
    );
}


export default EntryCard;
