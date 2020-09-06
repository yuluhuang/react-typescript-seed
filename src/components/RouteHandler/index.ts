import React from 'react';
// import {withRouter} from 'react-router';
// import util from '../../assets/utils/utils';

export class RouteHandler extends React.Component {
    componentDidMount() {
    }

    // componentWillReceiveProps(nextProps) {
    //     const {location, history: {action}} = nextProps;
    //     if (location !== this.props.location && action === 'PUSH') {
    //         // new navigation - scroll to top
    //         window.scrollTo(0, 0);
    //     }
    //     // eventually we might want to try setting up some scroll logic for 'POP'
    //     // events (back button) to re-set the previous scroll position
    // }

    render() {
        return this.props.children;
    }
}

// export default withRouter(RouteHandler);
