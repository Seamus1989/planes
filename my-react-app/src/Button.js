import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import StyledButton from "./buttonBonusCSS"
/*
Buttons
Tick and a cross drawn with CSS.
Receive name / animation prop from App.js and function handleClickDrag.


handleClickDrag - Where parent handles next card etc.
animation - (null / yes / no) this then controls state animateYes and animateNo
            which animate Yes/No buttons respectively

name - gives us access to current persons name - set by parents state.current

*/
Button.propTypes = {
  animation: PropTypes.bool.isRequired,
  handleClickDrag: PropTypes.func.isRequired
}
function Button({ name, handleClickDrag, animation }) {
  const [animateYes, setAnimateYes] = useState(null)
  const [animateNo, setAnimateNo] = useState(null)

  function handleClick(yayOrNay) {
    handleClickDrag(yayOrNay)
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
  }, [animation])
  return (
    <>
      <div className="choices">
        <StyledButton bounce={animateNo}>
          <span
            className="crossmark buttons2"
            style={{ gridColumn: 1 }}
            role="button"
            tabIndex={0}
            onClick={() => handleClick("No")}
          >
            <div className="crossmark_circle" />
            <div className="crossmark_stem" />
            <div className="crossmark_kick" />
          </span>
        </StyledButton>

        <StyledButton bounce={animateYes}>
          <span
            className="checkmark buttons"
            style={{ gridColumn: 2 }}
            onClick={() => handleClick("Yes")}
            role="button"
            tabIndex={0}
          >
            <div className="checkmark_circle" />
            <div className="checkmark_stem" />
            <div className="checkmark_kick" />
          </span>
        </StyledButton>
      </div>
    </>
  )
}
export default Button
