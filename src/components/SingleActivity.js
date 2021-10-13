import React from 'react';

const SingleActivities = ({ activity }) => {
    console.log(activity)

    return activity 
        ? <div className='activity-single'>
            <span>{activity.name}</span><br />
            <span>{activity.description}</span><br />
            <span>Count: {activity.count}</span><br />
            <span>Duration: {activity.duration} minutes</span>
        </div>
        : 'Loading...'
};

export default SingleActivities;