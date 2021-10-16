import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import {
    Activities,
    Home,
    Login,
    MyRoutines,
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
    const [userRoutines, setUserRoutines] = useState([]);
    const [username, setUsername] = useState('');
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

    const getUserName = async () => {
        try {
            const response = await fetch(`${REACT_APP_API_URL}/users/me`, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            })
            const data = await response.json();
            const {username} = data;
            setUsername(username);
            return;
        } catch (error) {
            console.error(error);
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
        setToken,
        userRoutines,
        setUserRoutines,
        username,
        setUsername
    };

    useEffect(() => {
        try {
            fetchPublicRoutines();
            fetchActivities();
            getUserName();
        } catch (error) {
            console.error(error);
        };
    }, [token]);
    
    useEffect(() => {
        const foundToken = localStorage.getItem('token');
        if (foundToken) {
            setToken(foundToken);
            setLoggedIn(true);
        };
    });

    return <>
        {/* HEADER */}
        <header className = 'site-header'>
            <div className='logo-container'>
                <Link to ='/' className='logo'><h1>Fitness Trac.kr</h1></Link>
            </div>
            <div className='link-bar'>
                <Link to='/' className='nav-link '>Home</Link>
                <Link to='/routines' className='nav-link'>Routines</Link>

                {loggedIn 
                    ? <Link to='/account/routines' className='nav-link'>My Routines</Link>
                    : null
                }
                <Link to='/activities' className='nav-link'>Activities</Link>
                { loggedIn
                    ? <button onClick={()=> { setToken(''); setLoggedIn(false); localStorage.removeItem('token');localStorage.removeItem('username'); history.push('/') }}>Logout</button>
                    : <Link to='/account/login'>Log in</Link>
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
            <Route exact path='/account/routines'>
                <MyRoutines {...props} />
            </Route>
            <Route exact path='/activities'>
                <Activities {...props} />
            </Route>
            <Route exact path='/account/login'>
                <Login {...props} />
            </Route>
            <Route exact path='/account/register'>
                <Register {...props} />
            </Route>
        </main>
    </>
};

export default App;