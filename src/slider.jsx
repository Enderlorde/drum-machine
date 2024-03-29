import React from 'react';
import classes from './slider.module.css';

/*Компонент слайдера настройки*/
class Slider extends React.Component {
	constructor(props){
		super(props)
		this.num = (this.props.max-this.props.min)/this.props.step
		this.points = Array(this.num+1).fill(
			<div className={classes.point}></div>
		)
	}
	
	/*Обработчик события изменения слайдера*/
	handlerChange(){
		this.props.changeDisplayText(this.props.title + ' ' + this._slider.value)
		this.props.changeState(this.props.title+"", parseInt(this._slider.value))
	}
		


	render(){
		return(
			<div className={classes.wrapper}>
				<p className={classes.title}>{this.props.title}</p>

				<div className={classes.groove}>
					<input className={classes.slider} ref={c => (this._slider = c)} onChange={this.handlerChange.bind(this)} type="range" min={this.props.min} max={this.props.max} step={this.props.step} defaultValue={this.props.default_value}/>
				</div>

				<div className={classes.points}>
					{this.points.map((element, index) => <React.Fragment key={index}>{element}</React.Fragment>)}
				</div>
			</div>
		)
	}
}	

export default Slider;