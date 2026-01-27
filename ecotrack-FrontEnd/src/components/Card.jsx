import { ArrowUpRight } from 'lucide-react';

export default function Card({ title, description, icon: Icon }) {
    return (
        <div className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity text-green-500">
                <ArrowUpRight size={24} />
            </div>

            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors text-green-600">
                <Icon size={28} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}
