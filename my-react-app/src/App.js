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
  }
  handleNext(outcome, person) {
    let newData = [...this.state.data]
    newData.push(newData.shift())
    let clickOutcomeObject = {}
    clickOutcomeObject[outcome] = person;
    this.setState((state) => ({
      data : newData,
      index : state.index+1,
      current : ([...newData]).shift().name,
      form : Object.assign(clickOutcomeObject, state.form)
    }))
  }
  render() {
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
            handleNext = {this.handleNext}
            name = {this.state.current}
            />
        </div>
      </React.Fragment>
    )
  }
}



export default App;
