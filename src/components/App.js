import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
    Home,
    Routines
} from './';

const { REACT_APP_BASE_URL } = process.env;

const App = () => {
    const [token, setToken] = useState('');
    const [routines, setRoutines] = useState([]);

    const history = useHistory();

    const fetchPublicRoutines = async () => {
        const resp = await fetch(`${REACT_APP_BASE_URL}/routines`);
        const results = await resp.json();
        if (results) {
            setRoutines(results);
        };
    };

    const props = {
        token,
        setToken,
        routines,
        setRoutines
    };

    useEffect(() => {
        try {
            fetchPublicRoutines();
        } catch (error) {
            console.error(error);
        };
    }, [token]);

    return <>
        {/* HEADER */}
        <header className = 'site-header'>
            <Link to ='/home' className='logo'><h1>Fitness Trac.kr</h1></Link>
            <div className='link-bar'>
                <Link to='/routines' className='nav-link'>Routines</Link>
            </div>
        </header>

        {/* ROUTES */}
        <main id = 'content'>
            <Route exact path = '/'>
                <Home {...props} />
            </Route>
            <Route exact path='/routines'>
                <Routines {...props} />                
            </Route>
        </main>
    </>;
}

export default App;