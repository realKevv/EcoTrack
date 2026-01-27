import { Leaf, BarChart3, Globe } from 'lucide-react';
import Card from './Card';

export default function Impact() {
    const features = [
        {
            icon: BarChart3,
            title: "Dati Reali",
            description: "Niente stime approssimative. Usiamo algoritmi certificati per calcolare la tua impronta esatta."
        },
        {
            icon: Leaf,
            title: "Azioni Concrete",
            description: "Ricevi suggerimenti personalizzati basati sulle tue abitudini per ridurre subito il tuo impatto."
        },
        {
            icon: Globe,
            title: "Impatto Globale",
            description: "Vedi come il tuo piccolo risparmio contribuisce a un cambiamento collettivo enorme."
        }
    ];

    return (
        <section className="py-8 px-6 bg-slate-50/50">
            <div className="max-w-7xl mx-auto">

                {/* Testo Centrale Motivazionale */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                        NON SEI SOLO UN <span className='text-green-600 font-bold, italic'>NUMERO</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                        Quando usi il nostro calcolatore, non stai solo inserendo dei dati.
                        Stai prendendo coscienza del tuo posto nel mondo.
                        Stai trasformando un'azione quotidiana invisibile in una <span className="text-green-600 font-bold">scelta consapevole</span>.
                    </p>
                </div>

                {/* Griglia Cards */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    ))}
                </div>
                <div className="max-w-3xl mx-auto text-center mb-4 py-20">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
                        <span className='text-green-600 font-bold, italic'>IL NOSTRO RUOLO?</span> Darti gli strumenti
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-10">
                        Noi forniamo la tecnologia, la scienza e i dati. Ma il vero motore sei tu. Il nostro lavoro è semplificare la sostenibilità, renderla accessibile e, perché no, anche gratificante. Vogliamo togliere la complessità per lasciarti solo la parte migliore: <span className="text-green-600 font-bold">la possibilità di agire.</span>.
                    </p>

                    <button className="bg-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200">
                        Vai al calcolatore
                    </button>
                </div>
            </div>
        </section>
    );
}
