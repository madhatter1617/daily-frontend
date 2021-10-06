import React, { useState } from 'react';



function EntryItem({serach, serach:{title, entry_text}, entries, setEntries, handleDeleteEntry, handleUpdate}) {
    const { id } = serach;
    const [newTitle, setNewTitle] = useState(serach.title);
    const [newText, setNewText] = useState(serach.entry_text);

    const [isEditMode, setIsEditMode] = useState(true);
    function handleEditClick() {
      setIsEditMode(!isEditMode);
      console.log({ isEditMode });
    }
  

    function handleDeleteClick() {
        fetch(`/entries/${id}`, {
          method: "DELETE",
        }).then((r) => {
          if (r.ok) {
            handleDeleteEntry(id);
          }
        });
      }

      function handleSubmitEdit(e) {
		e.preventDefault();
        fetch(`/entries/${serach.id}`, {
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
    <ul 
    //  onClick = { ()=> {
    // // clickNote(serach)
    // setEentryEdit(false)
    //  }}
     >    
      <h2>{title}</h2> 
      <p>{entry_text}</p>
       {/* <p>{entry_text.substring(0, 69)}</p> */}
       <button onClick={handleDeleteClick}> DELETE</button>
       {isEditMode ? (
                    <button className="primary" onClick={handleEditClick}>
                      Edit!
                    </button>
                  ) : (
                    editForm()
                  )}
    </ul>
  );
}

export default EntryItem;