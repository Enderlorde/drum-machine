import React from 'react';
import Drumpad from './drumpad';
import classes from './keyboard.module.css';

/*Компонент клавиатуры*/
class Keyboard extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    let pads;
    pads = this.props.pads.map(pad => <Drumpad power={this.props.power} volume={this.props.volume} bank={this.props.bank} loop={this.props.loop} changeDisplayText={this.props.changeDisplayText} keyCode={pad.keyCode} key={pad.keyLable} keyLable={pad.keyLable} trigger={pad.sound} url={pad.url}/>)
    return(
       <div id="keyboard" className={classes.keyboard}>{pads}</div>     
    ) 
  }
}

export default Keyboard;