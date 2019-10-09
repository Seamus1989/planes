import React, {useState, useEffect} from 'react';
import StyledModal from './bonusStyles.css.js'
// Styled - Components are gooooood

function Card({
  name,
  image,
  skills,
  zndex,
  position,
  margin,
  animate,
  handleNext,
  handleClickDrag
}) {
  //////////////////////////////////////////////////////////////////////////////
  const [fly, makeFly] = useState(animate)
  const [downX, setXDown] = useState(0)
  const [upX, setXUp] = useState(0)
  const [styler, setStyler] = useState({left : position, zIndex : zndex, marginTop : margin});
  //////////////////////////////////////////////////////////////////////////////
  function transitionEnd(e) {
    if (e.propertyName !== "left" || (fly != "No" && fly != "Yes")) return;
    if (fly === "Yes" || fly === "No") {
        // after animation ends, call parent handleNext function
        handleNext(animate, name)
      }
    };
  //////////////////////////////////////////////////////////////////////////////
  function dragEndFunc(e) {
    e.persist()
    setXUp(upX => e.clientX)
  }
  function dragStartFunc(e) {
    e.persist()
    setXDown(downX => e.clientX)
  }
  //////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Reposition card stack on every reRender
    setStyler({left : position, zIndex : zndex, marginTop : margin})
  }, [zndex, margin, position])
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
      let difference = downX - upX
      let fifthWindowWidth = window.innerWidth*(0.2)
      if (difference < 0 && fifthWindowWidth < -difference) {
        handleClickDrag("Yes", name)
      } else if (difference > 0 && fifthWindowWidth < difference) {
        handleClickDrag("No", name)
      }
  }, [upX])
  //////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Parent hands down animate, this will/wont cause an animation
    if (animate) {
      makeFly(animate)
    } else if (animate === false) {
      makeFly("default")
    }
  },[fly, animate])
  //////////////////////////////////////////////////////////////////////////////
  return (
    <React.Fragment>
    <StyledModal
      onTransitionEnd = {transitionEnd}
      flyType = {fly}
    >
      <div
          className = "card"
          draggable = {true}
          style = {styler}
          onDragStart = {dragStartFunc}
          onDragEnd =  {dragEndFunc}
          >
        <div className = "name"><h4>{name}</h4></div>
        <img draggable = {true} className = "image" src = {require(`${image}`)} alt = "Chuck norris"></img>
        <div>
          <p className = "skills">Skills: {skills}</p>
        </div>
      </div>
      </StyledModal>
    </React.Fragment>
  )
}

export default Card;
