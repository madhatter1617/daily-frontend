import React,{useState} from "react";
import EntryList from "./EntryList";

function Sidebar({notes, setNotes, clickNote, setNoteEd,noteEd}) {

  return (
    <div className="master-detail-element sidebar">
      <EntryList setNoteEd={setNoteEd} noteEd={noteEd} clickNote={clickNote} notes={notes} />
      
    </div>
  );
}

export default Sidebar;