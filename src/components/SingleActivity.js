import React from 'react';

const SingleActivities = ({ activity }) => {
    console.log(activity)

    return activity 
        ? <div className='activity-single'>
            <span>Name: {activity.name}</span>
            <span>Description: {activity.description}</span>
            <span>Repetition: {activity.count} times</span>
            <span>Duration: {activity.duration} minutes</span>
        </div>
        : 'Loading...'
};

export default SingleActivities;