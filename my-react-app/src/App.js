import React from "react"
import "./App.css"
import Card from "./Card"
import Button from "./Button"
import Title from "./Title"
import people from "./People"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
      data: people,
      current: [...people].shift().name,
      buttonAnimation: null
    }
    this.handleNext = this.handleNext.bind(this)
    this.handleClickDrag = this.handleClickDrag.bind(this)
  }

  handleNext(outcome, person) {
    // This function
    // A) Sets animate to false after its animation has finished
    // eslint-disable-next-line
    const newData = [...this.state.data]
    const zeroth = newData.shift()
    zeroth.animate = false
    newData.splice(0, 0, zeroth)
    // B) rotates, first element to the back of the pack
    newData.push(newData.shift())
    // C) Saves the click event outcome as this.state.form
    const clickOutcomeObject = {}
    clickOutcomeObject[person] = outcome
    // Now also undo the animation so cards reStack
    this.setState(state => ({
      data: newData,
      current: [...newData].shift().name,
      form: Object.assign(state.form, clickOutcomeObject), // ORDER means latest selection overrights previous
      buttonAnimation: null
    }))
  }

  handleClickDrag(outcome) {
    // This function copies data array, and adds a {animate = true} element to the top card if its been clicked yes/no
    // animate is then sent down and the child component renders animation if true, i.e animated off the stack
    // Child component then calls the above handleNext function
    // also sends down animation to buttons
    // eslint-disable-next-line
    const copy = [...this.state.data]
    const zeroth = copy.shift()
    zeroth.animate = outcome
    copy.splice(0, 0, zeroth)
    this.setState(() => ({
      data: copy,
      buttonAnimation: outcome
    }))
  }

  render() {
    // eslint-disable-next-line
    const cards = this.state.data.map((elem, index) => {
      return (
        <Card
          name={elem.name}
          image={elem.image}
          skills={elem.skill}
          key={elem.name} // should be unique so might need to rethink this
          zndex={1000 - `${index}`} // Order the stack
          position={3 * `${index}`} // position the stack
          margin={1 * `${index}`}
          animate={elem.animate || false}
          handleNext={this.handleNext}
          handleClickDrag={this.handleClickDrag}
        />
      )
    })
    return (
      <>
        <div className="background">
          <Title />
          <div className="card-stack">{cards}</div>
          <Button
            handleClickDrag={this.handleClickDrag} // hand down functions
            name={this.state.current} // hand down current person name to buttons
            animation={this.state.buttonAnimation}
          />
        </div>
      </>
    )
  }
}

export default App

/*


So if animate is true,
then do animation,
then go back up the stack and call whatever function

*/
