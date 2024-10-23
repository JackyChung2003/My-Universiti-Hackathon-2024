import React from 'react';
import SvgAnimation from '../../components/SvgAnimationDisplay';
import './index.css';

const WelcomeUser: React.FC = () => {
    return (
        <div className='welcome-container'>
            <SvgAnimation />
        </div>
    );
};

export default WelcomeUser;