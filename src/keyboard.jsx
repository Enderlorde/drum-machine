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
    pads = this.props.pads.map(pad => <Drumpad power={this.props.power} volume={this.props.volume} audio_url={pad.url} loop={this.props.loop}  keyCode={pad.keyCode} key={pad.keyLable} keyLable={pad.keyLable} sound_name={pad.sound} changeDisplayText={(text) => this.props.changeDisplayText(text)}/>)
    return(
       <div id="keyboard" className={classes.keyboard}>{pads}</div>     
    ) 
  }
}

export default Keyboard;