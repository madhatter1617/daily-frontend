
function EntryCard({entry, setEntries}) {
    
  
    
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


    function handleDelete(id) {
        fetch(`/entries/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then((deletedEntry) => {
            setEntries((prevEntry) => {
                const copyEntries = [...prevEntry];
                const index = copyEntries.findIndex((entry) => deletedEntry.id === entry.id)
                // console.log('INDEX FROM DELETE REQUEST', index);
                copyEntries.splice(index, 1);
                return copyEntries;
            });
        });
    }
    
   
    return (
        <>{
            listItems(entry)
        } </>
    );
}

export default EntryCard;
