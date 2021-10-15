import React from 'react';

import { SingleActivity } from './'

const Activities = ({ activities }) => {
    return activities 
        ? <>
            <div className='activities'>
                <span>Activities:</span>
                {
                activities.map(activity => <SingleActivity key={activity.id} activity={activity} />)
                }
            </div>
        </>
        : 'Loading...'
};

export default Activities;