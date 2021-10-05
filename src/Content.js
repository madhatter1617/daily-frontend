// import React from "react";
// import NoteEditor from "./NoteEditor";
// import NoteViewer from "./NoteViewer";
// import Instructions from "./Instructions";



// /*
//   Advice: If you cannot figure out how to get this component to work,
//           move the div and getContent up into NoteContainer and
//           try to get it to work in the parent first.
//           Then complete the rest of your app before attempting to
//           refactor to get this Content component to work.
// */
// function Content({note, noteEd, editNote,setNoteEd, setNote, setNotes,notes, setNewEdit, newEdit}) {
  
//   const getContent = () => {
//     if (noteEd) {
//       return <NoteEditor setNoteEd={setNoteEd} note={note} notes={notes} noteEd={noteEd} setNote={setNote} setNotes={setNotes} newEdit={newEdit}/>;
//     } else if (note) {
//       return <NoteViewer editNote={editNote} note={note} setNewEdit={setNewEdit}/>;
//     } else {
//       return <Instructions />;
//     }
//   };

//   return <div className="master-detail-element detail">{getContent()}</div>;
// }

// export default Content;
