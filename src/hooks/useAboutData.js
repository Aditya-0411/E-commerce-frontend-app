import { useState, useEffect } from 'react';
import api from '../utils/api'; // Your configured axios instance

/**
 * Custom hook to fetch the 'About' data (including policies and contact details)
 * from the backend API.
 */
const useAboutData = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await api.get('/accounts/about/'); 
                setAboutData(response.data);
            } catch (err) {
                console.error("API Error fetching about data:", err);
                setError('Failed to load company information from the server. Please check the API connection.');
            } finally {
                setLoading(false);
            }
        };
        fetchAboutData();
    }, []);

    return { aboutData, loading, error };
};

export default useAboutData;