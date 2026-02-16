import React, { useState } from 'react';
import TransportStep from '../components/calculator/TransportStep';
import TravelStep from '../components/calculator/TravelStep';
import HomeEnergyStep from '../components/calculator/HomeEnergyStep';
import FoodStep from '../components/calculator/FoodStep';
import ShoppingStep from '../components/calculator/ShoppingStep';
import WasteStep from '../components/calculator/WasteStep';
import Results from '../components/calculator/Results';
import { useCalculator } from '../hooks/useCalculator';
import { Loader2 } from 'lucide-react';
import EcoChat from '../components/EcoChat';

const Calculator = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { submitData, results, loading, resetCalculator } = useCalculator();

    const [formData, setFormData] = useState({
        transport: { mode: 'car', carDetails: { fuel: 'petrol', size: 'medium' }, km: 30 },
        travel: { flights: { short: 0, medium: 0, long: 0, class: 'economy' }, cruise: 0 },
        home: { shower: { time: 5, hot: true }, heating: { hours: 4, type: 'gas' }, appliances: { washingMachine: false, dishwasher: false, oven: false } },
        food: { diet: 'average', local: false },
        shopping: { clothes: { tshirt: 0, jeans: 0, shoes: 0, secondhand: false }, electronics: { smartphone: 0, laptop: 0 } },
        waste: { bags: 2, recycle: { plastic: false, paper: false, glass: false } }
    });

    const steps = [
        { id: 'transport_mode', label: 'Trasporto', component: TransportStep, sub: 'mode' },
        { id: 'transport_details', label: 'Veicolo', component: TransportStep, sub: 'details' },
        { id: 'travel_flights', label: 'Voli', component: TravelStep, sub: 'flights' },
        { id: 'travel_cruise', label: 'Crociera', component: TravelStep, sub: 'cruise' },
        { id: 'home_water', label: 'Acqua', component: HomeEnergyStep, sub: 'water' },
        { id: 'home_heat', label: 'Calore', component: HomeEnergyStep, sub: 'heat' },
        { id: 'home_apps', label: 'Apparecchi', component: HomeEnergyStep, sub: 'apps' },
        { id: 'food', label: 'Alimentazione', component: FoodStep },
        { id: 'shopping_clothes', label: 'Abbigliamento', component: ShoppingStep, sub: 'clothes' },
        { id: 'shopping_tech', label: 'Tecnologia', component: ShoppingStep, sub: 'tech' },
        { id: 'waste_bags', label: 'Rifiuti', component: WasteStep, sub: 'bags' },
        { id: 'waste_recycle', label: 'Riciclo', component: WasteStep, sub: 'recycle' }
    ];

    const handleDataChange = (sectionId, data) => {
        const dataKey = sectionId.split('_')[0];
        setFormData(prev => ({ ...prev, [dataKey]: data }));
    };

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            await submitData(formData);
        }
    };

    const handleBack = () => {
        if (results) {
            resetCalculator();
            setCurrentStep(0);
            return;
        }
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const currentStepConfig = steps[currentStep];
    const CurrentComponent = currentStepConfig.component;
    const dataKey = currentStepConfig.id.split('_')[0];

    if (loading) {
        return (
            <div className="min-h-screen bg-calc-clean flex flex-col items-center justify-center px-4">
                <div className="glass-card p-12 rounded-3xl shadow-2xl text-center max-w-md animate-in fade-in zoom-in duration-500 bg-white">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
                        <Loader2 size={64} className="animate-spin text-emerald-600 relative z-10 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Analisi in corso...</h2>
                    <p className="text-slate-600 mb-6">Stiamo calcolando la tua impronta statistica</p>
                    <div className="space-y-3">
                        <div className="skeleton h-2 w-3/4 mx-auto"></div>
                        <div className="skeleton h-2 w-full"></div>
                        <div className="skeleton h-2 w-5/6 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    const quotes = [
        { text: "La Terra non è un'eredità dei nostri padri, ma un prestito dei nostri figli.", author: "Proverbio Indiano" },
        { text: "Ogni piccola azione conta per un futuro più verde.", author: "EcoTrack" },
        { text: "Diventa il cambiamento che desideri vedere nel mondo.", author: "Mahatma Gandhi" },
        { text: "Un pianeta migliore inizia dalle tue scelte quotidiane.", author: "EcoTrack" }
    ];

    return (
        <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col items-stretch space-y-8">

                {/* Header */}
                <div className="text-center animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 mb-4 shadow-sm">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">EcoTrack Dashboard</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-3 leading-tight">
                        Il tuo impatto sul <span className="text-emerald-600">Pianeta</span>
                    </h1>
                    <p className="text-base md:text-lg text-slate-500 font-medium max-w-xl mx-auto">
                        Analisi delle tue emissioni giornaliere per un futuro più sostenibile.
                    </p>
                </div>

                {/* Wizard Container o Risultati */}
                {results ? (
                    <div className="max-w-6xl mx-auto w-full">
                        <Results
                            total={results.total}
                            breakdown={results.breakdown}
                            xpGained={results.xpGained}
                            currentLevel={results.currentLevel}
                            onRetake={() => { resetCalculator(); setCurrentStep(0); }}
                        />
                        <EcoChat breakdown={results.breakdown} total={results.total} />
                    </div>
                ) : (
                    <div className="relative w-full flex flex-col items-center">
                        {/* Progress Bar */}
                        <div className="w-full mb-6">
                            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="absolute h-full bg-emerald-500 transition-all duration-700 ease-out rounded-full"
                                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-2 px-1">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                                    Passaggio {currentStep + 1} di {steps.length}
                                </span>
                                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider">
                                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                                </span>
                            </div>
                        </div>

                        {/* Main Container */}
                        <div className="w-full bg-white rounded-2xl shadow-lg border border-slate-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">

                            {/* Step Content Area */}
                            <div className="flex-1 p-6 sm:p-8">
                                <CurrentComponent
                                    data={formData[dataKey]}
                                    onChange={(data) => handleDataChange(currentStepConfig.id, data)}
                                    subStep={currentStepConfig.sub}
                                />
                            </div>

                            {/* Navigation Footer - Monochromatic Emerald */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 sm:px-8 sm:py-5 bg-slate-50/80 border-t border-slate-100">
                                <button
                                    onClick={handleBack}
                                    disabled={currentStep === 0}
                                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold transition-all text-sm ${currentStep === 0
                                        ? 'opacity-0 pointer-events-none'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 active:scale-95 shadow-sm'
                                        }`}
                                >
                                    ← Indietro
                                </button>

                                <div className="hidden md:flex items-center gap-1.5">
                                    {steps.map((_, idx) => (
                                        <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentStep ? 'bg-emerald-500 w-6' : 'bg-slate-200 w-1.5'}`}></div>
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold shadow-md hover:bg-emerald-700 transition-all active:scale-95 flex items-center justify-center gap-3 text-sm"
                                >
                                    {currentStep === steps.length - 1 ? (
                                        <>
                                            <span>Mostra Risultati</span>
                                            <span>🌍</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Prossimo</span>
                                            <span>→</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quotes - Monochromatic Elegant */}
                {!results && (
                    <div className="w-full flex justify-center py-6 animate-in fade-in duration-700 delay-300">
                        <div className="max-w-lg px-8 py-5 rounded-2xl bg-white border border-slate-100 shadow-sm italic text-center relative">
                            <div className="absolute top-2 left-4 text-3xl text-emerald-200 select-none">“</div>
                            <div className="text-base font-medium leading-relaxed text-slate-600 pl-4">
                                {quotes[currentStep % quotes.length].text}
                            </div>
                            <div className="mt-2 text-[10px] font-bold text-slate-400 not-italic uppercase tracking-widest">
                                — {quotes[currentStep % quotes.length].author}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculator;