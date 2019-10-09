import styled from 'styled-components'
const StyledModal = styled.div`
position : relative;
left: ${props => {
  switch (props.flyType) {
    case "Yes":
      return "65vw";
    case "No":
      return "-65vw";
    default:
      return "0px";
    };
  }};
  transition: ${props => {
    switch (props.flyType) {
      case "Yes":
        return `all linear 0.5s;`;
      case "No":
        return `all linear 0.5s;`;
        default:
        return "";
      }
    }};
  `;
export default StyledModal;
