import React from 'react';


function Button({handleNext, name}) {
  function handleClick(e) {
    handleNext(e.target.name, e.target.value)
  }
  return (
    <React.Fragment>
    <div className = "choices">
      <button
        className = "buttons"
        style = {{gridColumn : 1, color : "red"}}
        name = {name}
        value = {"No"}
        onClick = {(e) => handleClick(e)}
        >&#10007;</button>

      <button
        className = "buttons"
        style = {{gridColumn : 2, color :"green"}}
        name = {name}
        value = {"Yes"}
        onClick = {(e) => handleClick(e)}
        >&#10003;</button>
    </div>
    </React.Fragment>
  )
}
export default Button;
