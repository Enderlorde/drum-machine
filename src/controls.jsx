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
		let sliders = this.props.controls.map((slider, index) => {
			return(
				<div key={index} className={classes.element}>
					<Slider title={slider.setting_name} app={this.props.app} min={slider.min} max={slider.max} step={slider.step} default_value={slider.default_value} key={index} changeState={this.props.changeState} changeDisplayText={this.props.changeDisplayText}/>
				</div>
			)})
		return(
			<div id="controls" className={classes.controls}>
				{sliders}
			</div>
		)
	}
}

export default Controls;