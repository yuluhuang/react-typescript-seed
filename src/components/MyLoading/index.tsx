import React from 'react';
import '../../style/loading.css'
import loading from '../../loading.svg'
// import Loadable from 'react-loadable';

export namespace MyLoading {
    export interface Props {
        loading: boolean
    }
}
// export default class MyLoading extends React.Component<Loadable.LoadingComponentProps> {
//     render() {
//         return <div>Loading...</div>;
//     }
// }

export const MyLoading = ({}): JSX.Element => {
    // if (loading) {
    //     return (<div className="loading">加载中</div>);
    // } else {
    //     return (<div></div>);
    // }
    return (<div className="loading"><img src={loading}  alt="logo" /></div>);
}
