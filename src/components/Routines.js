import React from 'react';
import { Link } from 'react-router-dom';
import { callApi } from '../util';

import { SingleRoutine } from './'

const Routines = ({setRoutines, fetchRoutines, routines, token, userData}) => {
    const handleDelete = async (routineId) => {
        await callApi({
            method: 'DELETE',
            url: '/routines/${routineId}',
            token
        });
        await fetchRoutines;
    };

    return <>
        {
         routines.map(routine => <SingleRoutine key={routine.id} routine={routine}>
             {/* CHILDREN */}
         </SingleRoutine>)
        }
    </>;
};

export default Routines;