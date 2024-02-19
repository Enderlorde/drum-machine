import React from 'react';
import classes from './drumpad.module.css';

/*Компонент клавиши*/
class Drumpad extends React.Component {
  constructor(props){
    super(props)
		this.state={
			active:"false",
			audio: new Audio (this.props.audio_url),
		}
  }
	
	/*Обработчик нажатия клавиатуры*/ 
	handleKeyPress(event){
		if (event.keyCode === this.props.keyCode){
			this.setBeat(this)
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
			console.log(this.props.volume);
			this.setState({active:"true"})
			this.props.changeDisplayText(this.props.sound_name);
			this.state.audio.volume = this.props.volume/100;
			this.state.audio.currentTime = 0;
			this.state.audio.play()
			setTimeout(this.setInactive.bind(this),100)
		}else{
			console.log('Turn me on!!!!')
		}
	}
	
	setBeat(){
		clearInterval(this.beat_timerID)
		this.props.loop>0?(this.beat_timerID = setInterval(() => this.playClip(),this.props.loop)):this.playClip();
	}
	
  render(){
    return (
			<div className={classes.pad_wrapper}>
				<div className={classes.pad_title}>
					<span>{this.props.sound_name.toUpperCase()}</span> <span className ={classes.inverse}>BANK{this.props.bank}</span>
				</div>
				
				<div className={classes.pad_info}>
					{this.props.keyLable}
				</div>

				<div className={classes.pad_border}>
					<div className={classes.drum_pad} active={this.state.active} id={this.props.trigger} onClick={() => this.setBeat()}>
					</div>
				</div>
			</div>
    )
  }
}

export default Drumpad;