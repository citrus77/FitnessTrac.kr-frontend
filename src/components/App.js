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
    const [token, setToken] = useState('');
    const [routines, setRoutines] = useState([]);
    const [activities, setActivities] = useState([]);

    const history = useHistory();

    const fetchActivities = async () => {
        try {            
            const response = await fetch(`${REACT_APP_API_URL}/activities`,
                { headers: { 'Content-Type': 'application/json'} }
            )
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
            { headers: { 'Content-Type': 'application/json'} }
        )
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
        routines,
        setRoutines,
        token,
        setToken
    };

    useEffect(() => {
        try {
            fetchPublicRoutines();
            fetchActivities();
            console.log(routines)
            console.log(activities)
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
                <Link to='/activities' className='nav-link'>Activities</Link> { 
                token
                    ? <button onClick={() => { setToken(''); setLoggedIn(false); history.push('./')}} className='nav-link logout set-right'>Log out</button>
                    : <Link to="/users/login" className="nav-link set-right">Login</Link>
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