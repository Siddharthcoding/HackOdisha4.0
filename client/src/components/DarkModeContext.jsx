// DarkModeContext.js
import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
};

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
