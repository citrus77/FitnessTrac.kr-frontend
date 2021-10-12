import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
    Home
} from './';

const { REACT_APP_BASE_URL } = process.env;

const App = () => {
    const [token, setToken] = useState('');
    const [routines, setRoutines] = useState([]);

    const history = useHistory();

    const fetchPublicRoutines = async () => {
        const resp = await fetch(`${REACT_APP_BASE_URL}/routines`);
        console.log(resp)
        const result = await resp.json();
        console.log(result)
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
        }
    }, [token]);

    return <>
        <header className = 'site-header'>
            {/* header and links here */}
        </header>

        <main id = 'content'>
            <Route exact path = '/'>
                <Home {...props} />
            </Route>
            <Route exact path='/routines'>
                <h1>Routines</h1>
                {
                    routines.map((routine) => <div>{routine.name}</div>)
                }
            </Route>
            {/* more routes */}

        </main>
    </>;
}

export default App;