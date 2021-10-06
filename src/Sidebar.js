import React from "react";
import EntryList from "./EntryList";

function Sidebar({searchEntry, entries, setEntries, handleDeleteEntry, handleUpdate}) {

  return (
    <div className="master-detail-element sidebar">
      <EntryList  searchEntry={searchEntry} entries={entries} setEntries={setEntries} handleDeleteEntry={handleDeleteEntry} handleUpdate={handleUpdate} />
      
    </div>
  );
}

export default Sidebar;