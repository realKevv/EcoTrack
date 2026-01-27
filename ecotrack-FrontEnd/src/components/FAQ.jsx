import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const questions = [
    {
        q: "Il servizio è gratuito?",
        a: "Sì, EcoTrack è completamente gratuito per gli utenti privati. Il nostro obiettivo è diffondere consapevolezza ambientale senza barriere."
    },
    {
        q: "Come vengono calcolati i dati?",
        a: "Utilizziamo database certificati a livello internazionale (come ADEME e GHG Protocol) per convertire le tue attività in kg di CO₂ equivalenti con la massima precisione possibile."
    },
    {
        q: "Devo registrarmi per usarlo?",
        a: "No, puoi usare il calcolatore liberamente senza account. La registrazione serve solo se desideri salvare i tuoi progressi nel tempo e accedere alla dashboard storica."
    },
    {
        q: "Come posso ridurre il mio impatto?",
        a: "Alla fine del test riceverai consigli personalizzati. Spesso piccoli cambiamenti, come ridurre la carne rossa o abbassare il riscaldamento di 1°C, hanno un impatto enorme."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="py-24 px-6 bg-slate-50">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Domande Frequenti</h2>
                    <p className="text-slate-500 mt-4">Tutto quello che devi sapere prima di iniziare.</p>
                </div>

                <div className="space-y-4">
                    {questions.map((item, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="font-bold text-slate-800 text-lg">{item.q}</span>
                                <span className={`text-green-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                                    {openIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
