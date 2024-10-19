import React from 'react';
// import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
            </header>
            <main className="dashboard-main">
                <section className="dashboard-section">
                    <h2>Section 1</h2>
                    <p>Content for section 1</p>
                </section>
                <section className="dashboard-section">
                    <h2>Section 2</h2>
                    <p>Content for section 2</p>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;