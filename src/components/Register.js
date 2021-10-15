import React, { useState } from 'react';
import { Link, Route } from 'react-router-dom'
import { useHistory } from 'react-router';

const Register = ({ setLoggedIn, setMessages, setUserData, setToken }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ verPass, setVerPass ] = useState('');
    const history = useHistory();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${REACT_APP_API_URL}/users/register`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({username, password})
            })
            const data = await response.json();           

            console.log(data,'<<<<<<<<<<<<<<<<<<<<<<<')
        }
        }
        catch (error) {
            console.error(error);
        };
    };

    return <>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className='login-form'>
            <input type='text' placeholder='enter username' onChange={(e) => setUsername(e.target.value)} value={username} />

            <input type="password" placeholder="enter password" onChange={(e) => setPassword(e.target.value)} value={password}></input>

            <input type="password" placeholder="verify password" onChange={(e) => setVerPass(e.target.value)} value={verPass}></input>

            <button type="submit" disabled={ !password || !username || password.length < 8 || password !== verPass }>Register</button>
        </form>
        <span>Already have an account? Click <Link to='/users/login'>here</Link> to login!</span>

        { password !== verPass && <span className='no-match-alert'>Passwords must match!</span> }

        { password.length < 8 && <span className='no-match-alert'>Passwords must contain at least 8 characters!</span> }
    </>;
};

export default Register;
