import React, { useContext } from 'react'
import MainContext from '../MainContext'


function Comment() {

    const { position } = useContext(MainContext)

  return (
    <div
    className='commenttext'
    style={ {position: 'fixed', top: position.y, left: position.x + 20 }}
    // bu şekilde, Leave Comment Text yazısı, mouse çubuğumun yan tarafında sürekli gözükecek
    >
    Leave Comment Text
    </div>
  )
}

export default Comment