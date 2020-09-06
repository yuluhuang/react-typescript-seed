import * as React from 'react';
import style from './style.css';
import AuthServices from '../../../service/AuthServices'

export interface Props {
    languageName: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

export const Hello = ({languageName, enthusiasmLevel = 1, onIncrement, onDecrement}: Props) => {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className={style.hello}>
            <div className={style.greeting}>
                Hello {languageName + getExclamationMarks(enthusiasmLevel)}
            </div>
            <div>
                <button onClick={onDecrement} className={style.btn}>-</button>
                <button onClick={onIncrement} className={style.btn}>+</button>
            </div>

            <button
                onClick={() => {
                    AuthServices.login({}).then(res => {
                        console.log(res);
                    });
                }}
                className={style.btn}>请求
            </button>
        </div>
    );
};
