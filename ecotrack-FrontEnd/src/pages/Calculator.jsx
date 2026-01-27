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
        { id: 'transport', label: 'Trasporti', component: TransportStep },
        { id: 'travel', label: 'Viaggi', component: TravelStep },
        { id: 'home', label: 'Casa', component: HomeEnergyStep },
        { id: 'food', label: 'Cibo', component: FoodStep },
        { id: 'shopping', label: 'Acquisti', component: ShoppingStep },
        { id: 'waste', label: 'Rifiuti', component: WasteStep }
    ];

    const handleDataChange = (section, data) => {
        setFormData(prev => ({ ...prev, [section]: data }));
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

    const CurrentComponent = steps[currentStep].component;

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-emerald-600">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="text-xl font-semibold text-slate-700">Elaborazione in corso...</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mb-4">
                        Calcola la tua Impronta
                    </h1>
                    {!results && (
                        <p className="text-lg text-slate-600">
                            Step {currentStep + 1} di {steps.length}: {steps[currentStep].label}
                        </p>
                    )}
                </div>

                {/* Progress Bar */}
                {!results && (
                    <div className="mb-8">
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-emerald-500 transition-all duration-500 ease-out"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Wizard Container */}
                {results ? (
                    <Results total={results.total} breakdown={results.breakdown} onRetake={() => { resetCalculator(); setCurrentStep(0); }} />
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 min-h-[400px] p-4 sm:p-8 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-2 duration-500">

                        <CurrentComponent
                            data={formData[steps[currentStep].id]}
                            onChange={(data) => handleDataChange(steps[currentStep].id, data)}
                        />

                        <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 0}
                                className={`px-6 py-3 rounded-xl font-semibold transition-colors ${currentStep === 0
                                        ? 'opacity-0 pointer-events-none'
                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                Indietro
                            </button>

                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-0.5"
                            >
                                {currentStep === steps.length - 1 ? 'Calcola Ora' : 'Continua'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Calculator;
