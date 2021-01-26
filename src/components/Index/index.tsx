import React from 'react';
import {connect} from "react-redux";
// import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
// import indexAction from '../../redux/actions/home';

var indexAction = require('../../redux/actions/home').default
// export namespace Index {
//     export interface Props {
//         loading: boolean
//     }
// }

// export const Index = ({loading} : Index.Props): JSX.Element => {
//     return (<div>index</div>);
//
// }
// export default class Index extends React.Component<any> {
//
//     render() {
//         const handleClick = () => {
//             this.props.history.push('/login');
//         }
//         // const handleClick2 = () => {
//         //     this.props.history.push('/index/404');
//         // }
//         return <div>
//             <div onClick={() => handleClick()}>to login</div>
//         </div>
//     }
// }
// interface ReduxState {
//
// }


// @connect(
//     (state: any, ownProps: any) => ({index: state.index}),
//     dispatch => ({
//         indexFn: bindActionCreators(indexAction, dispatch),
//     })
// )
class Index extends React.Component<any> {
    constructor(props:any) {
        super(props);
        // 搜索bar
        this.state = {
            disabled: false,
            disabled2: false
        };
    }

    // static propTypes = {
    //     index: PropTypes.object,
    //     demand: PropTypes.object,
    //     news: PropTypes.object,
    // };
    // static contextTypes = {
    //     store: PropTypes.object.isRequired,
    //     router: PropTypes.object.isRequired
    // };

    // componentDidMount1() {
    //     const {} = this.props;
    // }


    render() {
        const {} = this.props;
        const handleClick = () => {
            this.props.history.push('/login');
        }
        return (
            <div>
                <div onClick={() => handleClick()}>to login</div>
            </div>
        );
    }
}
export default connect((state: any, ownProps: any) => ({index: state.index}),
    (dispatch:any) => ({
        indexFn: bindActionCreators(indexAction, dispatch),
    }))(Index)
// export default Index;
