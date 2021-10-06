import React from "react";
import EntryItem from "./EntryItem";


function EntryList({searchEntry,entries, setEntries, handleDeleteEntry, handleUpdate}) {
 

  return (
    <ul>
      {/* Render list of notes here... */}
      {searchEntry.map(serach => <EntryItem  entries={entries} setEntries={setEntries} key={serach.id} serach={serach}  handleDeleteEntry={handleDeleteEntry} handleUpdate={handleUpdate}/>)}
    </ul>
  );
}

export default EntryList;