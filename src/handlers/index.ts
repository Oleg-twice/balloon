
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

export const lettersList = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЫЪЭЮЯ'.split('');
export const numbersList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

type FunctionType<DType> = (data: DType) => DType; 

export const pipe = <DType>(...fns: FunctionType<DType>[]) => (value: DType) => fns.reduce((v, f) => f(v), value);
