import React, { useContext, useState } from 'react'
import MainContext from '../MainContext'



function NoteBox() {


    const types = [
        {
          name: "comment",
          color: "red",
          text: "Comment"  
        }, {
            name: "private-comment",
            color: "#999",
            text: "Private Comment"  
          },{
            name: "Note",
            color: "Orange",
            text: "Note"  
          },
]

const { boxPosition, setMode, notes, setNotes, setBoxVisible  } = useContext(MainContext)
const [color, setColor] = useState(types[0].color)
const [note, setNote] = useState("")

const changeColor = (e) => {
  setColor(e.target.value)
}
// bu kod sayesinde kutucuk açıldığında Comment, Private Com. veya Note seçeneklerine bastığımda yukarıda Types kısmında yazdığım renkler gözükecek


const addNote = () => {
  const currentNote = {
    note,
    number: notes.length + 1,
    color,
    position: {
      x: boxPosition.x,
      y: boxPosition.y,
  } 
}
  setNotes([...notes,currentNote ])
  setBoxVisible(false)
  setMode(true) // bunu yapmazsam her seferinde not ekledikten sonra "x" tuşuna basmam gerecek
}
// [...notes] ile notların tamamı + benim notumu ekle demek istiyorum


return (
    <div
    style={{  
      '--color':color, 
      position: "absolute", 
      top: boxPosition.y, 
      left: boxPosition.x }}
    className="note-box"
    onMouseEnter={() => setMode(false)}
    onMouseLeave={() => setMode(true)}
    >

      <span className='note-number'>
        {notes.length + 1}
      </span>


      <select
      onChange={changeColor} // Kutu her onChange olduğunda rengi değişsin
      // style={{ backgroundColor: color}} 
      // Comment, Note gibi seçeneklerin olduğu büyük kutunun da arka plan rengini değiştirdim
      //veya (.note-box select) css dosyasına gidip "background-color: var(--color);" da diyebilirim.
      >
            {
                types.map(type => (
                    <option value={type.color}> {type.text} </option>
                    // value'ye type.color dedim çünkü changeColor kısmının çalışması için e.target.value yazdım.
                ))
            }
      </select>

      <textarea 
      cols="30" 
      rows="5"
      onChange={(e) => setNote(e.target.value)} 
      />
      
      <button
      disabled={!note} // Eğer not yoksa disabled gözüksün
      onClick={addNote}
      >
      Add</button>

    </div>
  )
} 

export default NoteBox