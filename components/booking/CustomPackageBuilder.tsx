'use client'

import {
  type CustomExterieurTier,
  type CustomFeatureKey,
  type CustomInterieurTier,
  getAllFeatureKeysForSelection,
  humanLabelForFeatureKey,
  labelForExterieurTier,
  labelForInterieurTier,
} from '@/lib/custom-package-estimate'

type Props = {
  ext: CustomExterieurTier
  int: CustomInterieurTier
  onExtChange: (t: CustomExterieurTier) => void
  onIntChange: (t: CustomInterieurTier) => void
  excludedKeys: ReadonlySet<CustomFeatureKey>
  onToggleExcluded: (key: CustomFeatureKey) => void
}

function groupLabelForKey(key: CustomFeatureKey): string {
  if (key.startsWith('ext:')) return 'Exterieur'
  return 'Interieur'
}

export default function CustomPackageBuilder({
  ext,
  int,
  onExtChange,
  onIntChange,
  excludedKeys,
  onToggleExcluded,
}: Props) {
  const keys = getAllFeatureKeysForSelection(ext, int)
  const invalid = ext === 'none' && int === 'none'

  return (
    <div className="rounded-xl border-2 border-primary-dark/10 bg-white p-4 md:p-5 space-y-5">
      <div>
        <h3 className="text-base font-bold text-primary-dark mb-2">Stel uw combinatie samen</h3>
        <p className="text-sm text-primary-dark opacity-75">
          Kies het gewenste exterieur- en interieurniveau. Vink onderdelen uit die u niet wilt laten uitvoeren
          (bijvoorbeeld ramen en spiegels). De richtprijs hieronder is een indicatie op basis van deze keuzes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-1.5">Exterieur</label>
          <select
            value={ext}
            onChange={(e) => onExtChange(e.target.value as CustomExterieurTier)}
            className="w-full px-3 py-2.5 rounded-lg border-2 border-secondary-dark/30 bg-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red"
          >
            <option value="none">Geen</option>
            <option value="basis">Exterieur Basis (€60)</option>
            <option value="deluxe">Exterieur Deluxe (€90)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-1.5">Interieur</label>
          <select
            value={int}
            onChange={(e) => onIntChange(e.target.value as CustomInterieurTier)}
            className="w-full px-3 py-2.5 rounded-lg border-2 border-secondary-dark/30 bg-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent-red"
          >
            <option value="none">Geen</option>
            <option value="basis">Interieur Basis (€50)</option>
            <option value="deluxe">Interieur Deluxe (€130)</option>
            <option value="premium">Interieur Premium (€220)</option>
          </select>
        </div>
      </div>

      {invalid && (
        <p className="text-sm text-accent-red font-medium">Selecteer minstens exterieur of interieur.</p>
      )}

      {!invalid && keys.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary-dark">Onderdelen (uit = niet gewenst)</p>
          <div className="space-y-3 max-h-[min(420px,50vh)] overflow-y-auto pr-1">
            {keys.map((key) => {
              const included = !excludedKeys.has(key)
              return (
                <label
                  key={key}
                  className="flex items-start gap-3 cursor-pointer text-sm text-primary-dark/90"
                >
                  <input
                    type="checkbox"
                    checked={included}
                    onChange={() => onToggleExcluded(key)}
                    className="mt-1 h-4 w-4 rounded border-secondary-dark/40 text-accent-red focus:ring-accent-red"
                  />
                  <span>
                    <span className="text-xs uppercase tracking-wide text-primary-dark/50 block">
                      {groupLabelForKey(key)}
                    </span>
                    {humanLabelForFeatureKey(key)}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      <div className="rounded-lg bg-primary-dark/5 border border-primary-dark/10 p-3 text-sm text-primary-dark/85">
        <p className="font-semibold text-primary-dark mb-1">Combinatie</p>
        <p>
          Exterieur: {labelForExterieurTier(ext)} · Interieur: {labelForInterieurTier(int)}
        </p>
        <p className="mt-2 text-xs text-primary-dark/65">
          Bij een combinatie die overeenkomt met Basis-, Deluxe- of Premium-pakket gebruiken we dezelfde bundelprijs
          (€100 / €170 / €250) vóór uitsluitingen. Anders tellen we de catalogusprijzen van de gekozen niveaus bij elkaar
          op. Uitsluitingen verlagen de richtprijs naar rato van het aantal onderdelen binnen het gekozen niveau.
        </p>
      </div>
    </div>
  )
}
