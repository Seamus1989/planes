import React from 'react';

import './App.css';
import Card from './Card.js'
import Button from './Button.js'
import Title from './Title.js'

import people from './People.js'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {form : {}, data : people, current : ([...people]).shift().name, index : 0}
    this.handleNext = this.handleNext.bind(this)
    this.handleClickDrag = this.handleClickDrag.bind(this)
  }
  handleNext(outcome, person) {
    console.log(outcome, person)
    // This function
      // A) Sets animate to false after its animation has finished
    let newData = [...this.state.data]
    let zeroth = newData.shift()
    zeroth['animate'] = false;
    newData.splice(0, 0, zeroth)
      // B) rotates, first element to the back of the pack
    newData.push(newData.shift())
      // C) Saves the click event outcome as this.state.form
    let clickOutcomeObject = {}
    clickOutcomeObject[outcome] = person;
    // Now also undo the animation so cards reStack

    this.setState((state) => ({
      data : newData,
      index : state.index+1,
      current : ([...newData]).shift().name,
      form : Object.assign(clickOutcomeObject, state.form)
    }))
  }
  handleClickDrag(outcome, person) {
    // This function copies data array, and adds a {animate = true} element to the top card if its been clicked yes/no
    // animate is then sent down and the child component renders animation if true, i.e animated off the stack
    // Child component then calls the above handleNext function
    let copy = [...this.state.data]
    let zeroth = copy.shift()
    zeroth['animate'] = outcome;
    copy.splice(0, 0, zeroth)
    this.setState((state) => ({
      data : copy
    }))
  }
  render() {
    let tempVariable = this.handleNext;
    let anotherTempVariable = this.handleClickDrag
    // Need to access this inside <Card>, create a temp variable
    let cards = this.state.data.map(function(elem, index) {
      return (
        <Card
          name = {elem.name}
          image = {elem.image}
          skills = {elem.skill}
          key = {elem.name}
          zndex = {1000-`${index}`} // Order the stack
          position = {5*`${index}`} // position the stack
          margin = {2*`${index}`}
          animate = {elem['animate'] || false}
          handleNext = {tempVariable}
          handleClickDrag = {anotherTempVariable}
          />
      )
    })
    return (
      <React.Fragment>
        <div className = "background">
          <Title/>
          <div className = "card-stack">
            {cards}
          </div>
          <Button
            handleClickDrag = {this.handleClickDrag} // hand down functions
            name = {this.state.current}   // hand down current person name to buttons
            />
        </div>
      </React.Fragment>
    )
  }
}

export default App;


/*


So if animate is true,
then do animation,
then go back up the stack and call whatever function

*/
