import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const {REACT_APP_API_URL} = process.env;

import { SingleRoutine } from './';


const MyRoutines = ({ token, username }) => {
    const [userRoutines, setUserRoutines] = useState([]);

    const fetchUserRoutines = async () => {
        try {
            console.log(username)
            if (username) {
                const response = await fetch(`${REACT_APP_API_URL}/users/${username}/routines`, {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                })
                const data = await response.json();
                console.log(data)
                if (data) {
                    setUserRoutines(data);
                    console.log(userRoutines)
                    return data;
                };
            };
            return;
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        try {
            fetchUserRoutines();
        } catch (error) {
            console.error(error);
        };
    }, []);
    
    return <>
        {
        userRoutines
        ? userRoutines.map(routine => {
                return <SingleRoutine key={routine.id} routine={routine}>
                    
                </SingleRoutine>
            })
        : null    
        }
    </>;
};

export default MyRoutines;