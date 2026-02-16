import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import montagnaGanzaria from '../assets/Montagna_Ganzaria.jpg';
import Etna from '../assets/Etna.jpg';
import Ragusa from '../assets/Ragusa.jpg';

// 2. LISTA IMMAGINI SICURA
const rawImages = [
    montagnaGanzaria || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    Etna || "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80",
    Ragusa || "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80", // Natura
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80", // Foresta
    "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?auto=format&fit=crop&w=800&q=80", // Montagna
];

const images = rawImages.filter(img => img);

const carouselImages = [...images, ...images, ...images, ...images];

const CarouselSection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const isPaused = selectedImage !== null || isHovered;

    return (
        <section className="py-24 bg-white overflow-hidden border-t border-slate-100 relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                    La natura che proteggiamo
                </h2>
                <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                    Dalla Ganzaria al resto del mondo. Clicca per esplorare.
                </p>
            </div>

            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsHovered(true)} // Ferma quando passi il mouse
                onMouseLeave={() => setIsHovered(false)} // Riparte quando esci
            >
                {/* Sfumature laterali per bellezza */}
                <div className="absolute top-0 left-0 z-20 w-24 sm:w-48 h-full bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
                <div className="absolute top-0 right-0 z-20 w-24 sm:w-48 h-full bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none" />

                <motion.div
                    className="flex gap-8"
                    // Usiamo animate per spostare la striscia verso sinistra
                    animate={{ x: "-50%" }}
                    initial={{ x: "0%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 60, // Velocità (più alto = più lento)
                        ease: "linear",
                        // Questo trucco serve a "congelare" il tempo quando è in pausa
                        repeatType: "loop"
                    }}
                    // Sovrascriviamo lo stile per mettere in pausa reale l'animazione
                    style={{
                        width: "max-content",
                        animationPlayState: isPaused ? 'paused' : 'running'
                    }}
                >
                    {carouselImages.map((src, index) => (
                        <motion.div
                            key={index}
                            layoutId={`img-${index}`} // Fondamentale per l'animazione di apertura
                            onClick={() => setSelectedImage({ src, index })}
                            className="relative w-[280px] h-[380px] sm:w-[350px] sm:h-[450px] flex-shrink-0 rounded-[2rem] overflow-hidden shadow-xl cursor-pointer group bg-slate-200"
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={src}
                                alt={`Natura ${index}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                    // Se un'immagine si rompe, ne mette una di riserva sicura
                                    e.target.onerror = null; // evita loop infiniti
                                    e.target.src = "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                            {/* Etichetta se è la tua montagna */}
                            {src === montagnaGanzaria && montagnaGanzaria && (
                                <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">
                                    📍 Monte Ganzaria
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* MODALE DI APERTURA */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            layoutId={`img-${selectedImage.index}`}
                            className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-colors z-10"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={selectedImage.src}
                                alt="Expanded Nature"
                                className="w-full h-full object-contain max-h-[90vh] bg-black"
                            />
                            {selectedImage.src === montagnaGanzaria && montagnaGanzaria && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                                    <h3 className="text-2xl font-bold">Monte Ganzaria</h3>
                                    <p>Il cuore verde del nostro territorio.</p>
                                </div>
                            )}
                            {selectedImage.src === Etna && Etna && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                                    <h3 className="text-2xl font-bold">Monte Etna</h3>
                                    <p>Il vulcano attivo più alto in Europa.</p>
                                </div>
                            )}
                            {selectedImage.src === Ragusa && Ragusa && (
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white text-center">
                                    <h3 className="text-2xl font-bold">Ragusa</h3>
                                    <p>e Modica sta Miiinchia.</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default CarouselSection;