import {Link} from "react-router-dom";

function EntryCard({entry, setEntries, entries}) {

    function listItems() {

        console.log(entries)
        return entries.map((e) => (

            <div>

                <p> Title: {
                    e.title
                } </p>
                <p>  Text: {
                    e.entry_text
                } </p>
                <button onClick={
                    () => handleDelete(e.id)
                }>DELETE</button>
                {/* <button onClick={() => potato()}>EDIT</button> */} </div>

        ));

    }


    function handleDelete(id) {
        fetch(`/entries/${id}`, {method: 'DELETE'}).then((r) => r.json()).then((deletedEntry) => {
            setEntries((prevEntry) => {
                const copyEntries = [...prevEntry];
                const index = copyEntries.findIndex((entry) => deletedEntry.id === entry.id);
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

    // <Link to={
    //     `/entries/${
    //         entry.id
    //     }`
    // }>

    //     {
    //     listItems(entries)
    // }
    //     {/* <tr className="table-row">
    //         <td>Title : {title}</td>
    //         <td>Text: {entry_text}</td>
    //     </tr> */} </Link>
    );
}

export default EntryCard;
