import React, { useContext, useState } from 'react'
import Draggable from 'react-draggable';
import MainContext from '../MainContext';

function Note({note}) {

  const [visible, setVisible] = useState(false)
  const {setMode, notes, setNotes} = useContext(MainContext)
  const [clickable, setClickable] = useState(true)

  const showNote = () => {
    if(clickable){
    setVisible(!visible)
  }
}



  return (
    <Draggable
    // defaultPosition={{x: note.position.x, y: note.position.y}}
    onDrag={() => setClickable(false)}
    onStart={() => setClickable(true)}
    // kutucuğu mouse ile taşımak istediğimize kutucuğu açsın kapatsın istemiyoruz, yani basılı tuttuğumuzda yuvarlak kutucuk açılmasın
    >
          <div
    style=
    {{ 
      '--color': note.color, 
      position: "absolute", 
      top: note.position.y, 
      left: note.position.x
    }} 
    className="note-container"
    onMouseEnter={() => setMode(false)}
    onMouseLeave={() => setMode(true)}
    >
    <span 
    className='note-number'
    onClick={showNote} // mouse ile numaralara tıkladığımızda, mesajları görebileceük
    >
        {note.number}
    </span>


    <div 
    className='note'
    style={{ display: visible ? 'flex' : 'none' }}
    >
      {note.note}
    </div>

    </div>

    </Draggable>
  )
}

export default Note