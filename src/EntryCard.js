import React, { useState } from 'react';
function EntryCard({entry, setEntries, onDelete, onUpdate, handleChangeTitle, handleChangeText, handleSubmitEdit, text, title}) {
    // const { id, title, text } = entry;
    const { id } = entry;
    // const [ isEditing, setIsEditing ] = useState(false);


    const [isEditMode, setIsEditMode] = useState(false);
    function handleEditClick() {
      setIsEditMode(!isEditMode);
      console.log({ isEditMode });
    }

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
                 
                <button onClick={handleSubmitEdit}> EDIT</button> 
                <br/>
                <br />
               
            </div>

        );

    }
    function handleSubmitEdit(e) {
		e.preventDefault();
        fetch(`/entries/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({ title, entry_text: text })
		})
			.then((response) => response.json())
			.then((eData) => setEntries(eData));
	}

    // function potato() {
	// 	return (
	// 		<div>
	// 			<form onSubmit={handleSubmit}>
    //             <input onChange={(e) => setTitle(e.target.value)} type="text" name="editTitle" value={title} />
    //             <input onChange={(e) => setText(e.target.value)} type="text" name="editText"value={text} />
	// 				<button type="submit" value="save" >
	// 					Submit
	// 				</button>
	// 				<button type="button" onClick={handleCancel}>
	// 					Cancel
	// 				</button>
	// 			</form>
	// 		</div>
	// 	);
	// }
    // function handleEditClick() {
    //     setIsEditing(!isEditing);
    //     console.log({ isEditing });
    //   }
    
    // function handleCancel() {
	// 	setIsEditing(false);
	// }

    // function handleUpdate() {
    //     fetch(`/entries/${id}`, {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ title, entry_text: text }),
    //     })
    //       .then((r) => r.json())
    //       .then((updatedEntry) => {
    //         onUpdate(updatedEntry);
    //       });
    //   } 
    return (
        <div>
            {listItems(entry)}
            <form onSubmit={handleSubmitEdit}>
                <p> Edit Title here:  </p>
                <input onChange={handleChangeTitle} type="textTitle" name="newReview" />
                <p> Edit Entry text here:  </p>
                <input onChange={handleChangeText} type="textText" name="newReview" />
                {/* <button type="submit">Save edit </button> */}
            </form>
        
         </div>
    );
}


export default EntryCard;
