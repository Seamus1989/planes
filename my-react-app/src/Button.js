import React from 'react';




class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <React.Fragment>
      <div className = "choices">
        <button className = "cross">X</button>
        <button className = "tick">&#10004;</button>
      </div>
      </React.Fragment>
    )
  }
}
export default Button;
