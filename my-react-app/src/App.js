import React from 'react';

import './App.css';
import Card from './Card.js'
import Button from './Button.js'
import Title from './Title.js'
const people = [
  {
    name : "Chuck Borris",
    image : "coming"
  },
  {
    name : "Tom Shmoose",
    image : "coming also"
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {form : {}}
    this.handleForm = this.handleForm.bind(this)
  }
  handleForm() {

  }
  render() {
    return (
      <React.Fragment>
        <div className = "background">
          <Title/>
          <Card/>
          <Button/>
        </div>
      </React.Fragment>
    )
  }
}



export default App;
