import React, { useState } from 'react';
function EntryCard({entry, setEntries, onDelete, handleUpdate }) {
    // const { id, title, text } = entry;
    const { id } = entry;
    // const [ isEditing, setIsEditing ] = useState(false);
    const [newTitle, setNewTitle] = useState(entry.title);
    const [newText, setNewText] = useState(entry.entry_text);

    const [isEditMode, setIsEditMode] = useState(true);
    function handleEditClick() {
      setIsEditMode(!isEditMode);
      console.log({ isEditMode });
    }

    // function handleDeleteClick() {
    //     fetch(`/entries/${id}`, {
    //       method: "DELETE",
    //     }).then((r) => {
    //       if (r.ok) {
    //         onDelete(id);
    //       }
    //     });
    //   }

   
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
                {/* <button onClick={handleDeleteClick}> DELETE</button> */}
                 
                {/* <button onClick={handleEditClick}> EDIT</button>  */}

                {isEditMode ? (
                    <button className="primary" onClick={handleEditClick}>
                      Edit!
                    </button>
                  ) : (
                    editForm()
                  )}
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
			body: JSON.stringify({ title: newTitle , entry_text: newText })
		})
			.then((r) => r.json())
			.then(handleUpdate);
	}
  const handleChangeTitle = (e) => {
    setNewTitle(e.target.value)
} 

const handleChangeText = (e) => {
  setNewText(e.target.value)
}
function editForm(){
  return (
    <div>

  <form onSubmit={handleSubmitEdit} autoComplete="off" >
                <p> Edit Title here:  </p>
                <input onChange={(e) => {handleChangeTitle(e)}} type="textTitle" name="newReview" value={newTitle} />
                <p> Edit Entry text here:  </p>
                <input onChange={(e) => {handleChangeText(e)}} type="textText" name="newText" value={newText} />
                <button type="submit">Save edit </button>
                <button type="button" onClick={handleCancel}>
						Cancel Edit
					</button>
            </form>
            </div>
		);
}

function handleCancel() {
  setIsEditMode(!isEditMode);
}
    return (
      
        <div>
            {/* {listItems(entry)} */}
           
           
            {/* {isEditMode ? {editForm} : !{editForm}} */}
            {/* <form onSubmit={handleSubmitEdit} autoComplete="off" >
                <p> Edit Title here:  </p>
                <input onChange={(e) => {handleChangeTitle(e)}} type="textTitle" name="newReview" value={newTitle} />
                <p> Edit Entry text here:  </p>
                <input onChange={(e) => {handleChangeText(e)}} type="textText" name="newText" value={newText} />
                <button type="submit">Save edit </button>
            </form> */}
        
         </div>
    );
}


export default EntryCard;
