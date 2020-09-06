import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from 'app/constants/index';
import {handleActions} from "redux-actions";
import {HelloModel} from "app/models";
import { RootState } from './state';

const helloState: RootState.HelloState =  {
    languageName: 'ts',
    enthusiasmLevel: 1
};

export const enthusiasm = handleActions<RootState.HelloState, HelloModel>(
    {
        [INCREMENT_ENTHUSIASM]: (state, action) => {
            console.log('INCREMENT_ENTHUSIASM', { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 })
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
        },
        [DECREMENT_ENTHUSIASM]: (state, action) => {
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
        }
    },
    helloState
);
