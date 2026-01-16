import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{ backgroundColor: 'var(--color-bg-main)', borderBottom: '1px solid var(--color-border)', padding: '1rem 0' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* Placeholder for Logo if available, using text for now */}
                    <img src="/logo.png" alt="Manabiya mom" style={{ height: '50px' }} />
                    <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', fontWeight: 'bold', marginLeft: '0.5rem' }}>Self-Coaching</span>
                </div>
                <nav>
                    {/* Future navigation items */}
                </nav>
            </div>
        </header>
    );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-section)' }}>
            <Header />
            <main className="container" style={{ padding: '2rem 1rem' }}>
                {children}
            </main>
            <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-sub)', fontSize: '0.875rem' }}>
                &copy; {new Date().getFullYear()} Manabiya Mom. All rights reserved.
            </footer>
        </div>
    );
};
