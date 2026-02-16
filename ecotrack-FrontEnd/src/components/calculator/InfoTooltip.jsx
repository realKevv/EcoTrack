import React from 'react';
import { HelpCircle } from 'lucide-react';

/**
 * InfoTooltip Component
 * Displays helpful information on hover
 * 
 * @param {string} content - The tooltip text to display
 * @param {string} className - Additional CSS classes
 */
const InfoTooltip = ({ content, className = '' }) => {
    return (
        <div className={`tooltip inline-flex ${className}`}>
            <button
                type="button"
                className="text-slate-400 hover:text-emerald-600 transition-colors p-1 rounded-full hover:bg-emerald-50"
                aria-label="More information"
            >
                <HelpCircle size={16} />
            </button>
            <div className="tooltip-content">
                {content}
            </div>
        </div>
    );
};

export default InfoTooltip;
