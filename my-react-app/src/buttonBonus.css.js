import styled from 'styled-components'

const StyledButton = styled.div`
transform: ${props => {
  switch (props.bounce) {
    case "Yes":
      return "Scale(2.2)";
    case "No":
      return "Scale(2.2)";
    case "Undo":
      return "Scale(1)"
    default:
      return "";
    };
  }};
  transition: ${props => {
    switch (props.bounce) {
      case "Yes":
        return `all ease-in 0.2s;`;
      case "No":
        return `all ease-in 0.2s;`;
      case "Undo":
          return `all ease-in 0.1s;`;
        default:
        return "";
      }
    }};
  `;
export default StyledButton;

/*

position : relative;
*/
