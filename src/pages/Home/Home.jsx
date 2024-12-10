import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
    return (
        <div className='Home-container'>
            <p className='Home-description'>
                Use the Teachers Aide AI Assistant to generate documents like lesson plans, assignments, quizzes, and exams for your classroom.
                You can upload personal documents in PDF format to guide the assistant towards your teaching style, or let it work on it’s own.
            </p>
            <Link to="/assistant" className='btn'>
                Get Started
            </Link>
        </div>
    );
};

export default HomePage;