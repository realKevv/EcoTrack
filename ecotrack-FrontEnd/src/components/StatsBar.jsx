import { Users, Calculator, Trees } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    {
        id: 1,
        name: 'Utenti Attivi',
        value: '1,200+',
        icon: Users,
    },
    {
        id: 2,
        name: 'Calcoli Effettuati',
        value: '5,400+',
        icon: Calculator,
    },
    {
        id: 3,
        name: 'Kg CO₂ Risparmiati',
        value: '12k',
        icon: Trees,
    },
];

export default function StatsBar() {
    return (
        <div className="bg-slate-900 py-12 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="flex flex-col items-center justify-center p-4"
                        >
                            <div className="bg-slate-800/50 p-3 rounded-2xl mb-4 text-green-400">
                                <stat.icon size={28} />
                            </div>
                            <dt className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                                {stat.value}
                            </dt>
                            <dd className="text-sm font-medium text-slate-400 uppercase tracking-wider">
                                {stat.name}
                            </dd>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
