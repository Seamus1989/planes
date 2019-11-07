import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import StyledCard from "./bonusStylesCSS"

/*

Lots going on here,
  name, image, skills - current person name handed down by parent
  zndex, position, margin - create the stack like look by slightly displacing each card
  animate - controls animation to the left or right (yes/no)
  handleClickDrag - this function essentially changes props handed down and calls the card animation
  handleNext - this then saves the outcome, puts the card to the back of the stack, and switches off animation

  MyComponent.propTypes = {
    // You can declare that a prop is a specific JS primitive. By default, these
    // are all optional.
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalFunc: PropTypes.func,
    optionalNumber: PropTypes.number,
    optionalObject: PropTypes.object,
    optionalString: PropTypes.string,
    optionalSymbol: PropTypes.symbol,


*/
Card.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  skills: PropTypes.string.isRequired,
  zndex: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  margin: PropTypes.number.isRequired,
  animate: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleClickDrag: PropTypes.func.isRequired
}
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
  // ////////////////////////////////////////////////////////////////////////////
  const [fly, makeFly] = useState(animate)
  const [downX, setXDown] = useState(0)
  const [upX, setXUp] = useState(0)
  const [styler, setStyler] = useState({
    left: position,
    zIndex: zndex,
    marginTop: margin
  })
  // ////////////////////////////////////////////////////////////////////////////
  function transitionEnd(e) {
    if (e.propertyName !== "left" || (fly != "No" && fly != "Yes")) return
    if (fly === "Yes" || fly === "No") {
      // after animation ends, call parent handleNext function
      handleNext(animate, name)
    }
  }
  // ////////////////////////////////////////////////////////////////////////////
  function dragEndFunc(e) {
    e.persist()
    setXUp(e.clientX)
  }
  function dragStartFunc(e) {
    e.persist()
    setXDown(e.clientX)
  }
  function touchStartFunc(e) {
    e.preventDefault()
    setXDown(e.touches[0].clientX)
  }
  function touchEndFunc(e) {
    e.preventDefault()
    setXUp(e.changedTouches[e.changedTouches.length - 1].clientX)
  }
  // ////////////////////////////////////////////////////////////////////////////
  // ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Reposition card stack on every reRender
    setStyler({ left: position, zIndex: zndex, marginTop: margin })
  }, [zndex, margin, position])
  // ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const difference = downX - upX
    const fractionWindowWidth = window.innerWidth * 0.15
    if (difference < 0 && fractionWindowWidth < -difference) {
      handleClickDrag("Yes")
    } else if (difference > 0 && fractionWindowWidth < difference) {
      handleClickDrag("No")
    }
  }, [upX])
  // ////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Parent hands down animate, this will/wont cause an animation
    if (animate) {
      makeFly(animate)
    } else if (animate === false) {
      makeFly("default")
    }
  }, [fly, animate])
  // ////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <StyledCard onTransitionEnd={transitionEnd} flyType={fly}>
        <div
          className="card"
          draggable
          style={styler}
          onDragStart={dragStartFunc}
          onDragEnd={dragEndFunc}
          onTouchStart={touchStartFunc}
          onTouchEnd={touchEndFunc}
        >
          <div className="name">
            <h4>{name}</h4>
          </div>
          <img
            draggable
            className="image"
            src={require(`${image}`)}
            alt="Chuck norris"
          />
          <div>
            <p className="skills">Skills: {skills}</p>
          </div>
        </div>
      </StyledCard>
    </>
  )
}

export default Card
