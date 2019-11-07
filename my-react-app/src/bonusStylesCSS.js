import styled from "styled-components"

const StyledCard = styled.div`
  position: relative;
  left: ${props => {
    switch (props.flyType) {
      case "Yes":
        return "75vw"
      case "No":
        return "-75vw"
      default:
        return "0px"
    }
  }};
  transition: ${props => {
    switch (props.flyType) {
      case "Yes":
        return `all ease-out 0.6s;`
      case "No":
        return `all linear 0.6s;`
      default:
        return ""
    }
  }};
`
export default StyledCard
