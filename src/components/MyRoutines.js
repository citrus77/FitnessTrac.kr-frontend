import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useHistory } from 'react-router';

import { SingleRoutine } from './'
import { callApi } from '../util';

const MyRoutines = ({ activities, fetchPublicRoutines, fetchUserRoutines, setUserRoutines, userRoutines }) => {
    const [name, setName] = useState('');
    const [goal, setGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newRoutine = await callApi({
                url: `/routines`,
                method: "POST",
                body: {name, goal, isPublic},
                token
            })
            if (newRoutine.error) {
                setError(newRoutine.error);
            };
            if (newRoutine) {
                await callApi({url: '/routines', token});
                console.log(newRoutine)
                setName('');
                setGoal('');
                setIsPublic(false);
                await fetchPublicRoutines;
                await fetchUserRoutines();
                history.push('/user/routines');
            };
            return newRoutine;
        } catch (error) {
            console.error(error);
        };
    };

    const handleDelete = async (routineId) => {
        try {
            await callApi({
                url: `/routines/${routineId}`, 
                method: "DELETE",
                token            
            })
            await callApi({url: '/routines', token});
            await fetchUserRoutines();
            await fetchPublicRoutines();
            history.push('/user/routines');
        } catch (error) {
            console.error(error);
        };    
    };

    const handleAddActivity = async () => {
        try {
            
        } catch (error) {
            console.error(error);
        };
    };

    return <>
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <label>Create a new routine:</label>
                <fieldset>
                    <label>Name: </label>
                    <input type='text' placeholder=' enter name' onChange={(e) => {setName(e.target.value)}} />
                </fieldset>
                <fieldset>
                    <label>Goal: </label>
                    <input type='text' placeholder=' enter goal' onChange={(e) => {setGoal(e.target.value)}} />
                </fieldset>
                <fieldset>
                    <label>Public: </label>
                    <select placeholder='no' onChange={(e) => {setIsPublic(e.target.value)}}>
                        <option value='false'>NO</option>
                        <option value='true'>YES</option>
                    </select>
                </fieldset>
                <button type='submit'>Create Routine</button>
                { error
                    ? <div className='password-alert'>{error}</div>
                    : null
                }
            </form>
        </div>
        
        { userRoutines.length > 0
            ? 
                <div className='routines'>
                    <span>Routines:</span>
                    {
                    userRoutines.map(routine => <SingleRoutine key={routine.id} routine={routine}>
                        {<button onClick={() => handleDelete(routine.id)}>Delete</button>}
                        
                    </SingleRoutine>)
                    }
                </div>
            
            : null }
    </>
};

export default MyRoutines;