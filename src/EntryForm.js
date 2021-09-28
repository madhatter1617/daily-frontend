import React, { useState} from 'react'

function EntryForm({handlePost, errors}) {
  const [title, setTitle] = useState('')
  const [ text, setText ] = useState('');

  function onSubmit(e){
    e.preventDefault()
    const entry = {
      title,
      text
    }
    handlePost(entry)
  }
    return (
      <div className="App">
        {errors?errors.map(e => <div>{e}</div>):null}
       <form onSubmit={onSubmit}>
       <label>
          Title
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br/>
        <label>
        Entry Text
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <br/>
       
        <input type="submit" value="Submit Entry" />
       </form>
      </div>
    );
  }
  
  export default EntryForm;