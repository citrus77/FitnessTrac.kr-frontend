import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const {REACT_APP_API_URL} = process.env;

import { SingleRoutine } from './';


const MyRoutines = ({ setUserRoutines, token, username, userRoutines }) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const fetchUserRoutines = async () => {
        try {
            if (username) {
                const response = await fetch(`${REACT_APP_API_URL}/users/${username}/routines`, {
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                })
                const data = await response.json();
                if (data) {
                    setUserRoutines(data);
                } else {
                    setUserRoutines([]);
                };
            };
            return;
        } catch (error) {
            console.error(error);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_API_URL}/routines`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({name, goal, isPublic}),
            })
            const data = await response.json();
            if (data) {
                setName('');
                setGoal('');
                setIsPublic(false);
                await fetchUserRoutines();
            };
            return;
        } catch (error) {
            console.error(error);
        };
    };

    const handleDelete = async (routineId) => {
        try {
            await fetch(`${REACT_APP_API_URL}/routines/${routineId}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            })
            await fetchUserRoutines();
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
        <div className='form-container'>
        <h2>Create a new routine:</h2>
        <form onSubmit={handleSubmit} className='login-form'>
            <input type='text' placeholder='Name your routine!' onChange={(e) => setName(e.target.value)} value={name} />

            <input type="text" placeholder="What is your goal?" onChange={(e) => setGoal(e.target.value)} value={goal}></input>

            <fieldset>
                <label>Private:</label>
                <select
                    name='isPublic' 
                    placeholder='No'
                    value={isPublic}                    
                    onChange={(e) => setIsPublic(e.target.value)}>
                    <option value='true'>no</option>
                    <option value='false'>yes</option>
                </select>
            </fieldset>
            
            <button type="submit" disabled={!name || !goal}>Create Routine</button>
        </form>
        </div>
        {
        userRoutines.length > 0
        ? userRoutines.map(routine => {
                return <SingleRoutine key={routine.id} routine={routine}>
                    {
                        <button onClick={() => handleDelete(routine.id)}>Delete</button>
                    }
                </SingleRoutine>
            })
        : null    
        }
    </>;
};

export default MyRoutines;