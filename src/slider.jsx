import React from 'react';
import classes from './slider.module.css';

/*Компонент слайдера настройки*/
class Slider extends React.Component {
	constructor(props){
		super(props)
	}
	
	/*Обработчик события изменения слайдера*/
	handlerChange(){
		this.props.changeDisplayText(this.props.setting_name + ' ' + this._slider.value)
		this.props.changeState(this.props.setting_name+"", parseInt(this._slider.value))
	}
	
	render(){
		return(
			<div className={classes.slider}>
				<div name={this.props.setting_name} className={classes.setting_name}>{this.props.setting_name}</div>
				<input className={classes.slider} ref={c => (this._slider = c)} onChange={this.handlerChange.bind(this)} type="range" min={this.props.min} max={this.props.max} step={this.props.step} defaultValue={this.props.default_value}/>
			</div>
		)
	}
}	

export default Slider;