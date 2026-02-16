import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, MessageSquare, Sparkles } from 'lucide-react';

const EcoChat = ({ breakdown, total }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        { role: 'model', content: "Ciao! 🐍 Sono l'Eco-Coach (powered by Python). Ho letto i tuoi dati: chiedimi pure un consiglio!" }
    ]);

    const messagesEndRef = useRef(null);

    // Scroll automatico verso il basso
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,     // La domanda dell'utente
                    totalCo2: total,    // I dati per il contesto
                    breakdown: breakdown // I dettagli
                }),
            });

            if (!response.ok) {
                throw new Error("Errore di comunicazione con Python");
            }

            const data = await response.json();

            // 3. Aggiungi la risposta di Python alla chat
            setMessages(prev => [...prev, { role: 'model', content: data.response }]);

        } catch (error) {
            console.error("Errore Chat:", error);
            setMessages(prev => [...prev, { role: 'model', content: "⚠️ Il cervello Python non risponde. Controlla che il terminale nero sia aperto!" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">

            {/* Bottone per aprire */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 group animate-bounce"
                >
                    <Bot size={28} />
                    <span className="font-bold hidden group-hover:block pr-2">AI Coach</span>
                </button>
            )}

            {/* Finestra Chat */}
            {isOpen && (
                <div className="bg-white w-80 sm:w-96 h-[500px] rounded-3xl shadow-2xl flex flex-col border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2 font-bold">
                            <Sparkles size={20} className="text-yellow-300" />
                            <span>Eco-Coach AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full"><X size={20} /></button>
                    </div>

                    {/* Area Messaggi */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                        ? 'bg-slate-800 text-white rounded-br-none'
                                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && <div className="text-slate-400 text-xs ml-4">Sto pensando... 🧠</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Chiedi consiglio..."
                            className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                        />
                        <button
                            onClick={handleSend}
                            disabled={loading}
                            className="bg-violet-600 text-white p-2 rounded-xl hover:bg-violet-700 disabled:opacity-50"
                        >
                            <Send size={20} />
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default EcoChat;