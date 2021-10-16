import React from 'react';
import { Link } from 'react-router-dom';

import { SingleRoutine } from './'

const Routines = ({ routines }) => {
    return <>
        {
        routines
            ? routines.map(routine => <SingleRoutine key={routine.id} routine={routine}>
             {/* CHILDREN */}
            </SingleRoutine>)
            : 'Loading...'
        }
    </>;
};

export default Routines;