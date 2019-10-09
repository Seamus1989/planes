import React, {useState, useEffect} from 'react';

function Card({
  name,
  image,
  skills,
  zndex,
  position,
  margin
}) {

  const [styler, setStyler] = useState({left : position, zIndex : zndex, marginTop : margin});
  useEffect(() => {
    setStyler({left : position, zIndex : zndex, marginTop : margin})
    return function() {
    }
  }, [zndex, margin, position])
  return (
    <React.Fragment>
      <div className = "card" style = {styler}>
        <div className = "name"><h4>{name}</h4></div>
        <img className = "image" src = {require(`${image}`)} alt = "Chuck norris"></img>
        <div>
          <p className = "skills">Skills: {skills}</p>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Card;
