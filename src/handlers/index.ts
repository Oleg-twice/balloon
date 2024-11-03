
declare global {
    interface Window {
        responsiveVoice?: unknown;
    }
}

export const colorsList = [
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

export const getColor = () => {
    let counter = init++;

    if (counter > colorsList.length - 1) {
        init = 1;
        counter = 0;
    }

    return colorsList[counter];
};

export const getRussinaLanguage = () => {
    return window.speechSynthesis
        .getVoices()
        .find(({ lang }) => lang === 'ru-RU');
};

export const speak = (textValue: string) => {
    window.speechSynthesis.cancel();
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(textValue);

    utterance.voice = getRussinaLanguage() as SpeechSynthesisVoice;
    utterance.rate = 1; // скорость произношения
    utterance.pitch = 1; // высота голоса
    synth.speak(utterance);
};

export const lettersList = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ'.split('');
export const numbersList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export const handleSpeak = (letter: string) => {
    window.speechSynthesis.cancel();
    if (letter === 'Й') {
        speak('ИЙ');
        return;
    }

    speak(letter);
};

type FunctionType<DType> = (data: DType) => DType; 

export const pipe = <DType>(...fns: FunctionType<DType>[]) => (value: DType) => fns.reduce((v, f) => f(v), value);
