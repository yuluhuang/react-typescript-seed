import React from 'react'

export namespace Login {
    export interface Props {

    }
}

export default class Login extends React.Component<any> {
    render() {
        const handleClick = () => {
            this.props.history.push('/index');
        }
        return <div onClick={() => handleClick()}>to index</div>
    }
}
