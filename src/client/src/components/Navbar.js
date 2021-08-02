import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({username, changeUsername}) {

    useEffect(() => {
        if (!username && !localStorage.getItem('username')) {
            document.querySelector('.modal').style.display = "block";
        }
    }, []);

    const emptyError = () => {
        document.querySelector('.modal-content input').classList.add("empty-error")
        setTimeout(() => {
            document.querySelector('.modal-content input').classList.remove("empty-error")
        }, 500);
    }

    const closeModal = () => {
        const modal = document.querySelector('.modal');
        if (username !== '')
            modal.style.display = "none";
        else
            emptyError();
    }

    const updateUsername = (input) => {
        if (input === '') {
            emptyError();
        }
        else {
            input = input.trimStart().trimEnd();
            if (input !== username)
                changeUsername(input);
            document.querySelector('input').value = input;
            document.querySelector('.modal').style.display = "none";
        }
    }

    return (
        <div className="navbar">
            <nav>
                <Link to='/'>
                    <div className="logo">Just Go Chat</div>
                </Link>
                <i className="fas fa-user" onClick={() => document.querySelector('.modal').style.display = "block"}></i>
            </nav>
            <div className="modal">
                <div className="modal-content">
                    <span className="close-modal" onClick={() => closeModal()}>x</span>
                    <p>Username:</p>
                    <input type="text" defaultValue={username}/>
                    <button onClick={() => updateUsername(document.querySelector('input').value)}>Set username</button>
                </div>
            </div>
        </div>
        
    );
}

export default Navbar;