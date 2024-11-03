import { useCallback, useState } from 'react';
import { Balloon } from './components/Balloon';
import './App.css';
import { Button } from './components/Button';
import { usePreventResizeOnTouch } from './hooks/usePreventResizeOnTouch';
import MusicToggle from './components/MusicToggle'

declare global {
  interface Window {
    responsiveVoice?: any;
  }
}

const colorsList = [
  'pink',
  'green',
  'grape',
  'orange',
  'yellow',
  'strawberry',
  'turquoise',
  'red',
  'mandarine',
];

let init = 0;

const getColor = () => {
  let counter = init++;

  if (counter > colorsList.length - 1) {
    init = 1;
    counter = 0;
  }

  return colorsList[counter];
};

const getRussinaLanguage = () => {
  return window.speechSynthesis
    .getVoices()
    .find(({ lang }) => lang === 'ru-RU');
};

const speak = (textValue: string) => {
  window.speechSynthesis.cancel();
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(textValue);

  utterance.voice = getRussinaLanguage() as SpeechSynthesisVoice;
  utterance.rate = 1; // скорость произношения
  utterance.pitch = 1; // высота голоса
  synth.speak(utterance);
};

const lettersList = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ'.split('');
const numbersList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const handleSpeak = (letter: string) => {
  if (letter === 'Й') {
    speak('ИЙ');
    return;
  }

  speak(letter);
}

function App() {
  const [isNumbers, setIsNumbers] = useState(false);

  const onButtonClick = useCallback(() => {
    setIsNumbers(prev => !prev);
  }, []);

  usePreventResizeOnTouch();

  return (
    <div className={`container ${isNumbers ? 'numbers' : ''}`} translate="no">
      <div className={`main-buttons-container ${isNumbers ? 'main-buttons-container--low' : ''}`}>
        <Button
          type="button"
          onClick={onButtonClick}
          text={isNumbers ? 'ПОКАЗАТЬ БУКВЫ' : 'ПОКАЗАТЬ ЦИФРЫ'}
          translate="no"
        />
        <MusicToggle />
      </div>
      <div className="main" />
      {(isNumbers ? numbersList : lettersList).map((letter, i) => {
        const color = getColor();
        return (
          <Balloon
            className="ballon-item"
            type={isNumbers ? 'round' : ''}
            key={i}
            letter={letter}
            color={color}
            onClick={handleSpeak}
          />
        );
      })}
    </div>
  );
}

export default App;
