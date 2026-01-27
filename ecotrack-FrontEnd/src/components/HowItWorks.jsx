import { PenLine, BarChart3, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: "01",
        title: "Compila",
        description: "Inserisci i dati sulle tue abitudini quotidiane: trasporti, casa, cibo e consumi.",
        icon: PenLine,
        color: "bg-blue-100 text-blue-600"
    },
    {
        number: "02",
        title: "Analizza",
        description: "Il nostro algoritmo calcola la tua impronta esatta e ti mostra dove impatti di più.",
        icon: BarChart3,
        color: "bg-purple-100 text-purple-600"
    },
    {
        number: "03",
        title: "Migliora",
        description: "Ricevi consigli pratici per ridurre le emissioni e monitora i tuoi progressi nel tempo.",
        icon: Leaf,
        color: "bg-green-100 text-green-600"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-green-600 font-bold tracking-wider uppercase text-sm">Semplice e Veloce</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                        Come funziona EcoTrack
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto relative`}>
                                <step.icon size={32} />
                                <span className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                                    {step.number}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{step.title}</h3>
                            <p className="text-slate-500 text-center leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
