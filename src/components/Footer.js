import React from 'react'
import SimpleReactFooter from "simple-react-footer";


function Footer() {

    const description = "Hi guys, I'm Ali Kartal. Welcome to my sticky note project. With this project you can create sticky notes. All you have to do is 'Press X'. You can view them by clicking on your notes. You can change their places by pressing and holding your notes. I hope you like it. Thank you for your interest."
    const title = "Textify - Sticky Note";
    const columns = [
      {
          title: "Visit",
          resources: [
              {
                  name: "Github",
                  link: "https://github.com/alikartalonline"
              }
          ]
      }
   ];

    
  return <div className='footer'>
  <SimpleReactFooter
  description={description} 
  title={title}
  columns={columns}
  linkedin="alikartalonline"
  facebook="facebook.com"
  twitter="alikartalonline"
  instagram="alikartalonline"
  youtube="AliKartalOnline"
  pinterest="https://tr.pinterest.com/"
  copyright= {` ${new Date().getFullYear()}  Ali Kartal`}
  iconColor="black"
  backgroundColor="bisque"
  fontColor="black"
  copyrightColor="black"
/>
</div>
};




export default Footer