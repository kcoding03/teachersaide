import React from 'react';
import './Layout.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <header className="Layout-header">
                <div className="bg-gray-800">
                    <div className="h-16 px-8 flex items-center justify-between">
                        <p className="text-white font-bold">Welcome to Your Teachers Aide!</p>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    );
};

export default Layout;