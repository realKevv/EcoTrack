import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Users, ChevronRight, RotateCcw, ShieldCheck, Leaf, Zap } from 'lucide-react';

// --- I DATI DELLE FOTO (Costanti fuori dalla funzione) ---
const PHOTOS = [
    {
        id: 1,
        src: "/src/assets/Montagna_Ganzaria.jpg",
        title: "Monte Ganzaria",
        desc: "Il simbolo del nostro impegno",
    },
    {
        id: 2,
        src: "/src/assets/Etna.jpg", // Assicurati che questi file esistano o cambia percorso
        title: "Etna",
        desc: "Vulcano in Sicilia",
    },
    {
        id: 3,
        src: "/src/assets/Crateri.jpg",
        title: "Crateri",
        desc: "Crateri vulcanici Etna",
    },
    {
        id: 4,
        src: "/src/assets/Mare.jpg",
        title: "Il Mediterraneo",
        desc: "Patrimonio da proteggere",
    }
];

export default function Conoscici() {
    // --- LOGICA DEL CAROSELLO ---
    const [index, setIndex] = useState(0);
    const [exitX, setExitX] = useState(0);

    const currentPhoto = PHOTOS[index % PHOTOS.length];
    const nextPhoto = PHOTOS[(index + 1) % PHOTOS.length];

    const handleNext = () => {
        setExitX(200); // Esce a destra
        setTimeout(() => {
            setIndex((prev) => prev + 1);
            setExitX(0);
        }, 200);
    };

    const handleReset = () => {
        setIndex(0);
    };

    return (
        <section className="py-24 px-6 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">

            {/* 1. SEZIONE CARTE INTERATTIVE (Ex Immagine Statica) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full mb-12 max-w-2xl" // max-w-2xl per non farla diventare enorme
            >
                <div className="flex flex-col items-center gap-6">

                    {/* STACK DELLE FOTO */}
                    <div className="relative w-full aspect-video perspective-1000">

                        {/* FOTO DI SFONDO (Quella sotto) */}
                        <div
                            className="absolute inset-0 w-full h-full bg-white rounded-[2.5rem] border-4 border-white shadow-xl opacity-60 z-0"
                            style={{
                                transform: 'rotate(-3deg) scale(0.95)',
                                backgroundImage: `url(${nextPhoto.src})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />

                        {/* FOTO ATTIVA (Quella sopra) */}
                        <AnimatePresence mode='wait'>
                            <motion.div
                                key={index}
                                initial={{ scale: 0.95, opacity: 0, x: 0 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0, x: 0 }}
                                exit={{ x: exitX !== 0 ? exitX : 250, opacity: 0, rotate: 10 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 100) handleNext();
                                    else if (info.offset.x < -100) {
                                        setExitX(-200);
                                        setTimeout(() => setIndex((prev) => prev + 1), 200);
                                    }
                                }}
                                className="absolute inset-0 z-10 w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white cursor-grab active:cursor-grabbing bg-gray-900"
                            >
                                <img
                                    src={currentPhoto.src}
                                    alt={currentPhoto.title}
                                    className="object-cover w-full h-full pointer-events-none"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-8 pointer-events-none">
                                    <div className="text-white">
                                        <p className="font-bold text-lg md:text-xl">{currentPhoto.title}</p>
                                        <p className="text-white/80 text-sm">{currentPhoto.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* CONTROLLI DELLE FOTO */}
                    <div className="flex gap-4 z-20">
                        {index % PHOTOS.length !== 0 && (
                            <button
                                onClick={handleReset}
                                className="bg-white/80 hover:bg-white text-slate-700 p-3 rounded-full backdrop-blur-md transition-all shadow-sm border border-slate-200"
                                aria-label="Ricomincia"
                            >
                                <RotateCcw size={20} />
                            </button>
                        )}

                        <button
                            onClick={handleNext}
                            className="bg-white text-slate-900 hover:scale-105 active:scale-95 p-3 px-6 rounded-full font-bold shadow-md flex items-center gap-2 transition-all border border-slate-200 cursor-pointer"
                        >
                            Scorri foto <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Decorative Elements (Blobs) */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60 -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 -z-10"></div>
            </motion.div>


            {/* 2. TESTO & STATISTICHE */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-2xl mx-auto mb-20"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm mb-8 border border-emerald-100 shadow-sm">
                    <Users size={16} />
                    <span>Quest'anno abbiamo aiutato 1000+ persone</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                    Sapere è il primo passo per <span className="text-emerald-600">cambiare.</span>
                </h1>

                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                    EcoTrack è nato per rendere visibile l'invisibile. Abbiamo aiutato oltre 1000 persone a scoprire il loro impatto reale sulla terra, trasformando numeri astratti in azioni concrete per un futuro più verde.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center cursor-pointer">
                        Unisciti alla missione <ArrowRight size={20} />
                    </button>
                    <button className="px-8 py-4 rounded-xl font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors w-full sm:w-auto cursor-pointer">
                        Scopri di più
                    </button>
                </div>
            </motion.div>

            {/* 3. I NOSTRI VALORI */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-5xl px-4 py-16"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">I Nostri Valori</h2>
                    <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Leaf,
                            title: "Sostenibilità",
                            desc: "Mettiamo l'ambiente al centro di ogni nostra decisione tecnica e strategica.",
                            color: "bg-emerald-100 text-emerald-600"
                        },
                        {
                            icon: Zap,
                            title: "Innovazione",
                            desc: "Utilizziamo le migliori tecnologie per rendere il monitoraggio ambientale semplice ed efficace.",
                            color: "bg-blue-100 text-blue-600"
                        },
                        {
                            icon: ShieldCheck,
                            title: "Trasparenza",
                            desc: "Dati chiari, calcoli precisi e massima onestà verso la nostra community.",
                            color: "bg-purple-100 text-purple-600"
                        }
                    ].map((val, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 text-left group">
                            <div className={`w-14 h-14 ${val.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <val.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>

        </section>
    );
}