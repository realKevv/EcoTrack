import { useState } from 'react';

export const useCalculator = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    const submitData = async (formData) => {
        setLoading(true);
        setError(null);

        let url = 'http://localhost:8080/api/calculate';

        try {
            const storedUser = localStorage.getItem('user');

            if (storedUser) {
                const userObj = JSON.parse(storedUser);

                const userId = userObj.id || userObj.userId;

                if (userId) {
                    url = `${url}?userId=${userId}`;
                    console.log("✅ Utente riconosciuto (ID " + userId + "). Invio richiesta per XP.");
                }
            }
        } catch (e) {
            console.error("Errore lettura utente:", e);
        }

        try {
            // Usiamo l'URL dinamico (che ora potrebbe avere l'ID)
            const response = await fetch(url, {
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

            console.log("RISPOSTA SERVER:", data);

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