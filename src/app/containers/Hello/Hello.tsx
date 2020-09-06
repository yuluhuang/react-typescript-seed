import {Hello} from 'app/components/Hello/Hello';
import * as actions from 'app/actions'
import {HelloModel} from 'app/models';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';


export const mapStateToProps = (state: any): HelloModel => ({
    enthusiasmLevel: state.enthusiasm.enthusiasmLevel,
    languageName: state.enthusiasm.languageName,
})

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
