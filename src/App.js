import { useEffect, useRef, useState } from 'react';
import './App.css';
import MainContext from './MainContext';
import Comment from './components/Comment';
import Note from './components/Note';
import NoteBox from './components/NoteBox';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {

  const screen = useRef(null)
// useRef: The useRef Hook allows you to persist values between renders. 
// It can be used to store a mutable value that does not cause a re-render when updated.
// div'e focus olmak istiyorum. Çünkü sayfayı yenilediğimde "x" tuşuna bassam da sayfa görmüyor. 
// Öncelikle div içine tıklamam gerekiyor, ben bunu yapmamak, direkt focus olmak için useRef kullanıyorum.

  // component ilk yüklendiğinde otomatik olarak div'e focuslanıyor.
  useEffect(() => {
    screen.current.focus() //screen.current > div'i temsil ediyor
  }, [])


    const [mode, setMode] = useState(false)
    const [position, setPosition] = useState({
      x: 0,
      y: 0
    }) // başlangıç olarak mouse hareketlerine 0 veriyorum. Ne zaman ki hareket ettilir o zaman aşağıda setPosition ile güncelleyeceğim.

    // const [notes, setNotes] = useState([
    //   {
    //     note: "bu bir test notudur",
    //     number: 1,
    //     color: "green",
    //     position: {
    //       x: 350,
    //       y: 300
    //     }
    //   }
    // ])

    const [notes, setNotes] = useState(localStorage.notes && JSON.parse(localStorage.notes)|| [])

    const [boxPosition, setBoxPosition] = useState({
      x: 0,
      y: 0
    })

    const [boxVisible, setBoxVisible] = useState(false)

    useEffect(() => {
      localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])
  // notlar değiştiğinde notları localStorage ile "notes" key'i altında, JSON.stringify(notes) ile kayıt ettim.

  
  const handleKeyUp = (e) => {
    if (e.key === "x") {
      // console.log('comment mod active!')
      setMode(!mode) // x tuşuna basıldığında setMode'u true yapacak
      setBoxVisible(false) // x tuşuna basıldığında kutucukları gizlicek
    }
    if (e.key === "Escape") { // yani ESC tuşu ile açılan kutuyu kapatabilirim
      setBoxVisible(false)
    }
  }

  const handleMouseMove = (e) => { // mouse hareketlerini yakalıyorum
    // console.log(e) // mouse hareketlerini console'dan görelim. 
    // Ben burada console'dan gördüğüm kadarıyla pageX/pageY veya clientX/clientY veya screenX/screenY olarak gözüküyor. 
    // Ben pageX-Y'yi kullanacağım. Artık mouse'un konumunu bu şekilde biliyorum.
    setPosition({
      x: e.pageX,
      y: e.pageY
    })
  }

  // O anki mouse'mun konumunu almak ve bunu bir state'e kaydetmek istiyorum
  // State ise açılacak yorum box'umuz için olacak
  const handleClick = (e) => {
    if (mode) {
    setBoxPosition({
      x: position.x,
      y: position.y
    })
    setBoxVisible(true)
  }
  }


  const data = {
    position,
    boxPosition,
    setMode,
    notes,
    setNotes,
    setBoxVisible,
  }



  return (
    <MainContext.Provider value={data} >
    <div 
    className={`screen${mode && ' editable'} `}
    onKeyUp={handleKeyUp}
    tabIndex={0} // key'i "c" yaptık
    ref={screen}
    onMouseMove={handleMouseMove} // mouse hareketleri
    onClick={handleClick}
    >

    <Header />


    
    
      { // mode varsa comment'i getir
             mode && <Comment />
      }

      
      {
        notes && notes.map((note, key) => <Note key={key} note={note} />)
      }

      {
        boxVisible && <NoteBox />
      }

      <Footer />
    </div>
    </MainContext.Provider>
  );
}

export default App;
