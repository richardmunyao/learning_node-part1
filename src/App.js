import { useEffect, useState } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  //fetching from server, v1
  /*
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }
  
  useEffect(hook, [])
  */

  //fetching from server, v2:
  useEffect( ()=> {
    noteService
      .getAll()
      .then(initalNotes => {
        setNotes(initalNotes)
      })      
  }, [])


  const notesToShow = showAll 
    ? notes 
    : notes.filter(note => note.important === true)  //or (note => note.important)
  
  const addNote = (event) =>{
    event.preventDefault()    
    const noteObject = {
      content: newNote,
      important: Math.random()< 0.5,      
    }
    
      noteService
        .create(noteObject)
        .then(returnedNote => {
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
  }

  const handleNoteChange = (event) => {    
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => { 
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    //PUT changes entire note
    //PATCH changes only some properties of note
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch (error => {
        alert(`the note '${note.content}' was already deleted from the server`)
        //set state to contain all notes except note with id in question
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=>setShowAll(!showAll)}
        >show {showAll ? 'important': 'all'}</button>
      </div>
      <ul>
        {
          notesToShow.map(note=> 
            <Note key={note.id} 
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}/>
            )}
      </ul>
      <form onSubmit={addNote}>
        <input 
        value={newNote}
        onChange = {handleNoteChange}
        />
        <button type="submit">save</button>

      </form>
    </div>
  )
}

export default App;