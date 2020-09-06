import React from 'react';
// import {connect} from "react-redux";
// import PropTypes from 'prop-types';
// import {bindActionCreators} from "redux";
// import indexAction from '../../redux/actions/home';

export namespace Index {
    export interface Props {
        loading: boolean
    }
}

// export const Index = ({loading} : Index.Props): JSX.Element => {
//     return (<div>index</div>);
//
// }
export default class Index extends React.Component<any> {

    render() {
        const handleClick = () => {
            this.props.history.push('/login');
        }
        // const handleClick2 = () => {
        //     this.props.history.push('/index/404');
        // }
        return <div>
            <div onClick={() => handleClick()}>to login</div>
        </div>
    }
}
// interface ReduxState {
//
// }

// @ts-ignore
// @connect(
//     (state: any) => ({index: state.index}),
//     dispatch => ({
//         indexFn: bindActionCreators(indexAction, dispatch),
//     })
// )
// class Index extends React.Component {
//     constructor(props:any) {
//         super(props);
//         // 搜索bar
//         this.state = {
//             disabled: false,
//             disabled2: false
//         };
//     }
//
//     static propTypes = {
//         index: PropTypes.object,
//         demand: PropTypes.object,
//         news: PropTypes.object,
//     };
//     static contextTypes = {
//         store: PropTypes.object.isRequired,
//         router: PropTypes.object.isRequired
//     };
//
//     componentDidMount() {
//         const {} = this.props;
//     }
//
//
//     render() {
//         const {} = this.props;
//         return (
//             <div>
//                 111
//             </div>
//         );
//     }
// }

// export default Index;
