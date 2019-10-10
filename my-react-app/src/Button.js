import React, { useEffect, useState } from 'react';

import StyledButton from './buttonBonus.css.js'
/*
Buttons
Tick and a cross drawn with CSS.
Receive name / animation prop from App.js and function handleClickDrag.


handleClickDrag - Where parent handles next card etc.
animation - (null / yes / no) this then controls state animateYes and animateNo
            which animate Yes/No buttons respectively

name - gives us access to current persons name - set by parents state.current

*/
function Button({name, handleClickDrag, animation}) {
  const [animateYes, setAnimateYes] = useState(null)
  const [animateNo, setAnimateNo] = useState(null)

  function handleClick(yayOrNay) {
    handleClickDrag(yayOrNay,name)
  }

  useEffect(() => {
    if (animation === "Yes") {
      setAnimateYes("Yes")
    } else if (animation === "No") {
      setAnimateNo("No")
    } else if (animation === null) {
      setAnimateYes("Undo")
      setAnimateNo("Undo")
    }
  },[animation])
  return (
    <React.Fragment>
    <div className = "choices">
    <StyledButton
      bounce = {animateNo}>
      <span className="crossmark buttons2"
            style = {{gridColumn : 1}}
            onClick = {() => handleClick("No")}>
        <div className="crossmark_circle"></div>
        <div className="crossmark_stem"></div>
        <div className="crossmark_kick"></div>
      </span>
      </StyledButton>


      <StyledButton
        bounce = {animateYes}>
        <span className="checkmark buttons"
              style = {{gridColumn : 2}}
              onClick = {() => handleClick("Yes")}>
          <div className="checkmark_circle"></div>
          <div className="checkmark_stem"></div>
          <div className="checkmark_kick"></div>
        </span>
      </StyledButton>
    </div>
    </React.Fragment>
  )
}
export default Button;
