import React from 'react';

import { SingleActivity } from './'

const Activities = ({ activities }) => {

    return <>
        <div className='activities'>
            <span>Activities:</span>
            {
            activities.map(activity => <SingleActivity key={activity.id} activity={activity} />)
            }
        </div>
    </>;
};

export default Activities;