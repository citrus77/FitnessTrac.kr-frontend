import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
    Activities,
    Home,
    Routines
} from './';

const { REACT_APP_BASE_URL } = process.env;

const App = () => {
    const [token, setToken] = useState('');
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);

    const history = useHistory();

    const fetchActivities = async () => {
        const resp = await fetch(`${REACT_APP_BASE_URL}/activities`);
        const results = await resp.json();
        if (results) {
            setActivities(results);
        };
    };

    const fetchPublicRoutines = async () => {
        const resp = await fetch(`${REACT_APP_BASE_URL}/routines`);
        const results = await resp.json();
        if (results) {
            setRoutines(results);
        };
    };

    const props = {
        activities,
        setActivities,
        routines,
        setRoutines,
        token,
        setToken,
    };

    useEffect(() => {
        try {
            fetchPublicRoutines();
            fetchActivities();
        } catch (error) {
            console.error(error);
        };
    }, [token]);

    return <>
        {/* HEADER */}
        <header className = 'site-header'>
            <Link to ='/' className='logo'><h1>Fitness Trac.kr</h1></Link>
            <div className='link-bar'>
                <Link to='/routines' className='nav-link'>Routines</Link>
                <Link to='/activities' className='nav-link'>Activities</Link>
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
            <Route exact path='/activities'>
                <Activities {...props} />
            </Route>
        </main>
    </>;
};

export default App;