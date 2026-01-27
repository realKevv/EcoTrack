import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* PARTE SINISTRA: TESTO */}
        <div>
          <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
            🌱 Versione Beta 1.0
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Monitora il tuo <br />
            <span className="text-green-600">impatto reale.</span>
          </h1>

          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Non servono calcoli complicati. Inserisci i tuoi dati e scopri quanta CO₂
            risparmi ogni giorno con le tue scelte.
          </p>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-200">
              Inizia ora <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-xl font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
              Come funziona
            </button>
          </div>
        </div>

        {/* PARTE DESTRA: SPAZIO FOTO */}
        <div className="relative">
          {/* Questo div è il contenitore della foto */}
          <div className="aspect-square bg-slate-100 rounded-[3rem] border border-slate-300 flex items-center justify-center relative overflow-hidden">
            <img src="/src/assets/sfondo-bg.png" className="object-cover w-full h-full, mx-auto, hover:scale-105 transition-all " />

          </div>


          {/* Decorazione fluttuante (facoltativa) */}
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100">
            <p className="text-xs text-slate-500 font-bold uppercase">Utenti attivi</p>
            <p className="text-2xl font-black text-slate-900">1,240+</p>
          </div>
        </div>


      </div>
    </section>
  );
}