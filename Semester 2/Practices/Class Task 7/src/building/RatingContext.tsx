import React, { createContext, useState, ReactNode } from 'react';

export interface RatingContextType {
    ratings: { [key: number]: number | null };
    setRating: (id: number, value: number | null) => void;
}

export const RatingContext = createContext<RatingContextType | undefined>(undefined);

export const RatingProvider = ({ children }: { children: ReactNode }) => {
    const [ratings, setRatings] = useState<{ [key: number]: number | null }>({});

    const setRating = (id: number, value: number | null) => {
        setRatings(prev => ({ ...prev, [id]: value }));
    };

    return (
        <RatingContext.Provider value={{ ratings, setRating }}>
            {children}
        </RatingContext.Provider>
    );
};
