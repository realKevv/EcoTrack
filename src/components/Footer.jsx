import { Facebook, Twitter, Instagram, Linkedin, Leaf } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">

                {/* Brand */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 font-bold text-2xl text-white mb-4">
                        <div className="bg-green-600/20 p-2 rounded-full text-green-500">
                            <Leaf size={24} />
                        </div>
                        EcoTrack
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Monitora, riduci e compensa la tua impronta di carbonio.
                        Piccoli gesti per un grande impatto.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h4 className="font-bold text-white mb-4">Piattaforma</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Home</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Calcolatore</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Chi siamo</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Contatti</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h4 className="font-bold text-white mb-4">Legale</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Termini di Servizio</a></li>
                        <li><a href="#" className="hover:text-green-400 transition-colors">Cookie Policy</a></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h4 className="font-bold text-white mb-4">Seguici</h4>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                    </div>
                </div>

            </div>

            <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                <p>© {new Date().getFullYear()} EcoTrack. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}
