import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const GameContext = createContext();

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

export const GameProvider = ({ children }) => {
    const [score, setScore] = useState(() => {
        // Load from localStorage on init
        const saved = localStorage.getItem('creativeWebflow_orbScore');
        return saved ? parseInt(saved, 10) : 0;
    });
    const [orbsCollected, setOrbsCollected] = useState([]);
    const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    // Persist score to localStorage
    useEffect(() => {
        localStorage.setItem('creativeWebflow_orbScore', score.toString());

        // Check for easter egg unlock (collect 10 orbs)
        if (score >= 10 && !easterEggUnlocked) {
            setEasterEggUnlocked(true);
            setShowEasterEgg(true);
            // Hide easter egg notification after 5 seconds
            setTimeout(() => setShowEasterEgg(false), 5000);
        }
    }, [score, easterEggUnlocked]);

    const collectOrb = useCallback((orbId) => {
        if (!orbsCollected.includes(orbId)) {
            setOrbsCollected(prev => [...prev, orbId]);
            setScore(prev => prev + 1);
        }
    }, [orbsCollected]);

    const resetGame = useCallback(() => {
        setScore(0);
        setOrbsCollected([]);
        setEasterEggUnlocked(false);
        localStorage.removeItem('creativeWebflow_orbScore');
    }, []);

    return (
        <GameContext.Provider value={{
            score,
            orbsCollected,
            easterEggUnlocked,
            showEasterEgg,
            collectOrb,
            resetGame,
            setShowEasterEgg
        }}>
            {children}
        </GameContext.Provider>
    );
};

export default GameContext;
