import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
    Activities,
    Home,
    Login,
    Register,
    Routines
} from './';

const { REACT_APP_API_URL } = process.env;

const App = () => {
    //STATE
    const [activities, setActivities] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [routines, setRoutines] = useState([]);
    const [token, setToken] = useState('');
    //HOOKS
    const history = useHistory();

    const fetchActivities = async () => {
        try {            
            const response = await fetch(`${REACT_APP_API_URL}/activities`,
                { headers: { 'Content-Type': 'application/json'} })
            const data = await response.json();
            if (data) {
                setActivities(data);
            };
        } catch (error) {
            throw error;
        };
    };

    const fetchPublicRoutines = async () => {
        try {            
            const response = await fetch(`${REACT_APP_API_URL}/routines`,
            { headers: { 'Content-Type': 'application/json'} })
            const data = await response.json();
            if (data) {
                setRoutines(data);
            };
        } catch (error) {
            throw error;
        };
    };

    const props = {
        activities,
        setActivities,
        loggedIn,
        setLoggedIn,
        routines,
        setRoutines,
        token,
        setToken
    };

    useEffect(() => {
        try {
            fetchPublicRoutines();
            fetchActivities();
        } catch (error) {
            console.error(error);
        };
    }, [token]);
    
    useEffect(() => {
        const foundToken = localStorage.getItem('token');
        if (foundToken) {
            setToken(foundToken);
        };
    });

    return <>
        {/* HEADER */}
        <header className = 'site-header'>
            <Link to ='/' className='logo'><h1>Fitness Trac.kr</h1></Link>
            <div className='link-bar'>
                <Link to='/routines' className='nav-link'>Routines</Link>
                <Link to='/activities' className='nav-link'>Activities</Link>
                { !loggedIn
                    ?<Link to='/users/login' className='nav-link'>Log in</Link>
                    : <button onClick={()=> { setToken(''); setLoggedIn(false) }}>Logout</button>
                }
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
            <Route exact path='/users/login'>
                <Login {...props} />
            </Route>
            <Route exact path='/users/register'>
                <Register {...props} />
            </Route>
        </main>
    </>
};

export default App;