import { useState } from 'react';

export const useCalculator = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    const submitData = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            // API CALL TO SPRING BOOT
            const response = await fetch('http://localhost:8080/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Errore nella richiesta al server');
            }

            const data = await response.json();

            // Expected format from Java Controller:
            // {
            //   total: number,
            //   breakdown: { transport: number, travel: number, ... }
            // }

            setResults(data);
            return data;
        } catch (err) {
            setError("Impossibile connettersi al server. Assicurati che il backend Java sia in esecuzione.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetCalculator = () => {
        setResults(null);
        setError(null);
    };

    return {
        submitData,
        results,
        loading,
        error,
        resetCalculator
    };
};
