import React from 'react';
import {Link} from 'react-router';

export default (props) => {
    return <div>
        <h1>emoji-url-short</h1>
        <Link to="/">Main Page</Link>
        <Link to="/other">Other Page</Link>
        {props.children}
    </div>
}
