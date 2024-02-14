import React from 'react';
import { createRoot } from 'react-dom/client';
import Display from './display';
import Controls from './controls';
import Keyboard from './keyboard';
import classes from './app.module.css';


/*---------------------------------------------------------------------------*/
/*Банк 1*/
const banks = [
		[
			{keyCode:	81,keyLable:'Q',sound:'snare',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/33[kb]909sd.wav.mp3'},
			{keyCode:	87,keyLable:'W',sound:'hi-hat',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/37[kb]909-banging-lofi-hat.wav.mp3'},  
			{keyCode:	69,keyLable:'E',sound:'tom-tom',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Toms/270[kb]tom-tom-spring-verb-lo.wav.mp3'},
			{keyCode:	65,keyLable:'A',sound:'fl.tom',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Toms/42[kb]midtom.wav.mp3'},
			{keyCode:	83,keyLable:'S',sound:'crash',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Crashes/96[kb]909-bright-crash.wav.mp3'},  
			{keyCode:	68,keyLable:'D',sound:'cymbals',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Cymbals/82[kb]opencym.wav.mp3'},  
			{keyCode:	90,keyLable:'Z',sound:'clap',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/13[kb]707-clap.wav.mp3'},
			{keyCode:	88,keyLable:'X',sound:'bass',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Toms/214[kb]giant_tom.wav.mp3'},  
			{keyCode:	67,keyLable:'C',sound:'gong',url:'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Gongs%20and%20Super%20Crashes/276[kb]big-boomy-gong.wav.mp3'},
		], 
		[
			{keyCode:	81,keyLable:'Q',sound:'Heater-1',url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'},
			{keyCode:	87,keyLable:'W',sound:'Heater-2',url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'},  
			{keyCode:	69,keyLable:'E',sound:'Heater-3',url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'},
			{keyCode:	65,keyLable:'A',sound:'Heater-4',url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'},
			{keyCode:	83,keyLable:'S',sound:'Clap',url:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'},  
			{keyCode:	68,keyLable:'D',sound:'Open-HH',url:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'},  
			{keyCode:	90,keyLable:'Z',sound:'Kick-Hat',url:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'},
			{keyCode:	88,keyLable:'X',sound:'Kick',url:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'},  
			{keyCode:	67,keyLable:'C',sound:'Clos.-HH',url:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'},
		]
	]

/*Настройки*/
const controls = [
	{setting_name:'volume',default_value:100,min:0,max:100,step:10,},
	{setting_name:'bank',default_value:1,min:1,max:2,step:1,},
	{setting_name:'loop',default_value:0,min:0,max:1000,step:100,},
	{setting_name:'power',default_value:1,min:0,max:1,step:1,}
]

/*Строка кредитсов*/
const credits = 'Credits * Fonts * Digital-7 by Style-7 * Chakra Petch, Monoton, Bebas Neue by google fonts * Bank 1 sounds from https://sampleswap.org/ * Bank 2 sounds from https://freecodecamp.org/ * Enderlorde 2021 * '
/*---------------------------------------------------------------------------*/
/*Базовый компонент приложения*/
class App extends React.Component {
  constructor(props){
    super(props)
		this.state={
			display_text:'',
			current_message:'Hello! Click any pad or press key to play sound.',
			current_char_number:0,
			current_audio:'',
			power:1,
			loop:0,
			gain:100,
			bank:1,
			volume:100,
		}
		this.changeDisplayText = this.changeDisplayText.bind(this)
		this.displayTextSlide = this.displayTextSlide.bind(this)
		this.changeState = this.changeState.bind(this)
  }
	
	/*Функция прокрутки текста на дисплее*/
	displayTextSlide() {
		let buffer = []
		let message = this.state.current_message.split('').map(elem => elem===" "?'\u00A0':elem)
		let char_number = this.state.current_char_number
		for (let i = 0;i<25;i++){
			let current_char_index = char_number + i
			if (current_char_index>=message.length){
				buffer.push(message[current_char_index - message.length])
			}else{
				buffer.push(message[current_char_index])
			}
		}
		
		if ((char_number+1)>message.length){
			char_number = 1
		}else{
			char_number+=1
		}
		this.setState({
			display_text:buffer.join(''),
			current_char_number:char_number,
		})
	}
	
	componentDidMount() {
    this.timerID = setInterval(this.displayTextSlide,500)
		console.log(credits)
  }
	
	componentWillUnmount() {
   	clearInterval(this.timerID)
  }
	
	/*Смена и форматирование текста*/
	changeDisplayText(text){
		/*Костыль*/
		this.setState({current_audio:text})
		
		if (text.length < 25){
			let placeholder = new Array(25 - text.length).fill('\u00A0')
			text = text.split('').concat(placeholder).join('')
		}
		this.setState({current_message:text})
	}
	
	/*Изменение состояний*/
	changeState(state,value){
		let new_state = {}
		new_state[state] = value
		this.setState(new_state)
	}
	
  render(){
    return (
      <div id="drum-machine" className={classes.app}>
        <Display power={this.state.power} text={this.state.display_text} current_audio={this.state.current_audio}/>
				<Controls power={this.state.power} controls={controls} changeState={this.changeState} changeDisplayText={this.changeDisplayText}/>
        <Keyboard power={this.state.power} volume={this.state.volume} bank={this.state.bank} loop={this.state.loop} pads={banks[this.state.bank-1]} changeDisplayText={this.changeDisplayText}/>
      </div>
    )
  }
}

const root = createRoot(document.getElementById('container'));
root.render(<App />)
