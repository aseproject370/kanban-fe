import React from 'react'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <p>PAGE NOT FOUND</p>
            <Link to="/">GO TO LOGIN</Link>
        </div>
    );
}

export default PageNotFound;
