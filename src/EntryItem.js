import React, { useState } from 'react';



function EntryItem({serach, serach:{title, entry_text}, entries, setEntries, handleDeleteEntry, handleUpdate}) {
    const { id } = serach;
    const [newTitle, setNewTitle] = useState(serach.title);
    const [newText, setNewText] = useState(serach.entry_text);

    const [canSee, setCanSee] = useState(false);
    function viewClick() {
        setCanSee(!canSee);
      console.log({ canSee });
    }

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
    <div  >

  <form class="editarea" onSubmit={handleSubmitEdit} autoComplete="off" >
  <button class="saveBtn" type="submit">Save edit </button>
                <button class="cancelBtn" type="button" onClick={handleCancel}>
						Cancel Edit
					</button>
                <p > Edit Title here:  </p>
                <textarea name="text" rows="2" cols="69" wrap="soft" class="editTitle" onChange={(e) => {handleChangeTitle(e)}}  name="newReview" value={newTitle} />
                <p > Edit Entry text here:  </p>
                <textarea name="text" rows="10" cols="69" wrap="soft" class="editText" onChange={(e) => {handleChangeText(e)}}  name="newText" value={newText} />
                <br/>
               
            </form>
            </div>
		);
}

function handleCancel() {
  setIsEditMode(!isEditMode);
}
function canView(){
    return( 
        <div className="primary" > <p>{entry_text}</p> </div>  )
}

  return (
    <ul class="item">
    <p className="primaryTitle" onClick={viewClick}> {title} </p>
    {canSee? canView() :null}
      
      {/* {canSee ? (
                    <h2 className="primary" onClick={viewClick}>
                     {title}
                    </h2>
                  ) : (
                    canView()
                  )} */}


      {/* <p>{entry_text}</p> */}
       {/* <p>{entry_text.substring(0, 69)}</p> */}
       
       
       {isEditMode ? (
                    <button className="editbtn"  onClick={handleEditClick}>
                      Edit!
                    </button>
                  ) : (
                    editForm()
                  )}
                  <button className="deleteBtn" onClick={handleDeleteClick}> DELETE</button>
    </ul>
  );
}

export default EntryItem;