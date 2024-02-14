import React from 'react';
import classes from './display.module.css';

/*Компонент дисплея*/
class Display extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div id="display" className={classes.display}>				
				<div id="active-segments" className={classes.active_segments}>{this.props.power?this.props.text:''}</div>
      </div>
    )
  }
}

export default Display;