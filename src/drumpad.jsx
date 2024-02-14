import React from 'react';
import classes from './drumpad.module.css';

/*Компонент клавиши*/
class Drumpad extends React.Component {
  constructor(props){
    super(props)
		this.state={
			active:"false",
		}
  }
	
	/*Обработчик нажатия клавиатуры*/ 
	handleKeyPress(event){
		if (event.keyCode === this.props.keyCode){
			this.setBeat()
		}
	}	

	componentDidMount(){
		document.addEventListener('keydown', this.handleKeyPress.bind(this))
	}
	
	/*Переключение в неактивное состояние*/
	setInactive(){
		this.setState({active:"false"})
	}
	
	playClip(){
		if (this.props.power){
			this.setState({active:"true"})
			this.props.changeDisplayText(this.props.trigger)
			const audio = $('#'+this.props.keyLable).get(0)
			audio.volume = this.props.volume/100
			audio.currentTime = 0
			audio.play()
			setTimeout(this.setInactive.bind(this),100)
		}else{
			console.log('Turn me on!!!!')
		}
	}
	
	setBeat(){
		clearInterval(this.beat_timerID)
		this.props.loop>0?(this.beat_timerID = setInterval(this.playClip.bind(this),this.props.loop)):this.playClip();
	}
	
  render(){
    return (
			<div className={classes.pad_wrapper}>
				<div className={classes.pad_title}>
					<span>{this.props.trigger.toUpperCase()}</span> <span className ={classes.inverse}>BANK{this.props.bank}</span>
				</div>
				
				<div className={classes.pad_info}>
					{this.props.keyLable}
				</div>

				<div className={classes.pad_border}>
					<div className={classes.drum_pad} active={this.state.active} id={this.props.trigger} onClick={this.setBeat.bind(this)}>
						{this.props.keyLable}
						<audio className={classes.clip} src={this.props.url} id={this.props.keyLable}></audio>
					</div>
				</div>
			</div>
    )
  }
}

export default Drumpad;