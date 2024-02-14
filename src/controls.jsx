import React from 'react';
import Logo from './logo';
import Slider from './slider';
import classes from './controls.module.css';

/*Компонент панели настроек*/
class Controls extends React.Component {
	constructor(props){
		super(props)
	}
	
	render(){
		let knobs = this.props.controls.map(knob => {return(<Slider setting_name={knob.setting_name} app={this.props.app} min={knob.min} max={knob.max} step={knob.step} default_value={knob.default_value} key={knob.setting_name} changeState={this.props.changeState} changeDisplayText={this.props.changeDisplayText}/>)})
		return(
			<div id="controls" className={classes.controls}>
				<Logo changeDisplayText={this.props.changeDisplayText} />
				{knobs}
			</div>
		)
	}
}

export default Controls;