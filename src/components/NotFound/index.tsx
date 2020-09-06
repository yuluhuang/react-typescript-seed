import React from 'react';

export namespace NotFound {
    export interface Props {
        match: string
    }
}

export default ({match}: NotFound.Props): JSX.Element => {
    return (<div>404</div>)
}
