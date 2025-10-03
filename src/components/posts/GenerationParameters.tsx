'use client';

import { GenerationParams } from '@/types/post';

interface GenerationParametersProps {
  params: GenerationParams;
  onChange: (params: GenerationParams) => void;
  disabled?: boolean;
}

export default function GenerationParameters({
  params,
  onChange,
  disabled = false
}: GenerationParametersProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-black mb-3">
          Style de transformation
        </label>
        <select
          value={params.style}
          onChange={(e) => onChange({ ...params, style: e.target.value })}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-lg border border-gray/20 bg-white text-black focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        >
          <option value="realistic">Réaliste</option>
          <option value="artistic">Artistique</option>
          <option value="cartoon">Cartoon</option>
          <option value="sketch">Esquisse</option>
          <option value="professional">Professionnel</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-black mb-3">
          Instructions de génération *
        </label>
        <textarea
          value={params.prompt}
          onChange={(e) => onChange({ ...params, prompt: e.target.value })}
          rows={6}
          disabled={disabled}
          className="w-full px-4 py-4 rounded-lg border border-gray/20 bg-white text-black placeholder-gray/60 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none disabled:opacity-50"
          placeholder="Ex: Ajouter plus de couleurs vives, rendre plus moderne, style artistique, améliorer la luminosité..."
          required
        />
        <p className="text-xs text-gray mt-2">
          Décrivez précisément les modifications que vous souhaitez apporter
        </p>
      </div>
    </div>
  );
}