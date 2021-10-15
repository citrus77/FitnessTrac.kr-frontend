import React from 'react';
import { Link } from 'react-router-dom';

import { SingleRoutine } from './'

const Routines = ({setRoutines, fetchRoutines, routines, token, userData}) => {
    console.log(routines)
    return <>
        {
         routines.map(routine => <SingleRoutine key={routine.id} routine={routine}>
             {/* CHILDREN */}
         </SingleRoutine>)
        }
    </>;
};

export default Routines;