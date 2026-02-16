import { ArrowUpRight } from 'lucide-react';

export default function Card({ title, description, icon: Icon, number }) {
    return (
        <div className="group relative bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm hover:shadow-xl hover:shadow-green-900/20 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center h-full">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity text-green-400">
                <ArrowUpRight size={24} />
            </div>

            <div className="relative w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-slate-700 transition-colors text-green-400">
                <Icon size={28} />
                {number && (
                    <span className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-slate-900 shadow-lg">
                        {number}
                    </span>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-slate-400 leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}
