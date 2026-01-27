import { ArrowRight, Leaf, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Conoscici() {
    return (
        <section className="py-24 px-6 max-w-4xl mx-auto min-h-screen flex flex-col items-center justify-center text-center">

            {/* 1. Central Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full mb-12"
            >
                <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative z-10">
                    <img
                        src="/src/assets/Montagna_Ganzaria.jpg"
                        alt="Monte Ganzaria"
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-8">
                        <div className="text-white">
                            <p className="font-bold text-lg md:text-xl">Monte Ganzaria</p>
                            <p className="text-white/80 text-sm">Il simbolo del nostro impegno</p>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl opacity-60 -z-10"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-60 -z-10"></div>
            </motion.div>

            {/* 2. Content & Impact Stat */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-2xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-sm mb-8 border border-emerald-100 shadow-sm">
                    <Users size={16} />
                    <span>Quest'anno abbiamo aiutato 1000+ persone</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                    Sapere è il primo passo per <span className="text-emerald-600">cambiare.</span>
                </h1>

                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
                    EcoTrack è nato per rendere visibile l'invisibile. Abbiamo aiutato oltre 1000 persone a scoprire il loro impatto reale sulla terra, trasformando numeri astratti in azioni concrete per un futuro più verde.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center">
                        Unisciti alla missione <ArrowRight size={20} />
                    </button>
                    <button className="px-8 py-4 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors w-full sm:w-auto">
                        Scopri di più
                    </button>
                </div>
            </motion.div>

        </section>
    )
}
