import type { SignatureFields } from '../lib/brand'

type Props = {
  fields: SignatureFields
  onChange: (next: SignatureFields) => void
}

const fieldLabels: { key: keyof SignatureFields; label: string; hint?: string; type?: string }[] = [
  { key: 'fullName', label: 'Full name', hint: 'Required' },
  { key: 'title', label: 'Title', hint: 'Optional' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'mainPhone', label: 'Main phone' },
  { key: 'extension', label: 'Extension' },
  { key: 'directPhone', label: 'Direct phone' },
  { key: 'fax', label: 'Fax' },
  { key: 'company', label: 'Company' },
  { key: 'address', label: 'Address' },
  { key: 'website', label: 'Website' },
]

export function SignatureForm({ fields, onChange }: Props) {
  function update<K extends keyof SignatureFields>(key: K, value: SignatureFields[K]) {
    onChange({ ...fields, [key]: value })
  }

  return (
    <form className="sig-form" onSubmit={(e) => e.preventDefault()}>
      <div className="form-grid">
        {fieldLabels.map(({ key, label, hint, type }) => (
          <label key={key} className={`field${key === 'address' ? ' field-wide' : ''}`}>
            <span className="field-label">
              {label}
              {hint ? <em>{hint}</em> : null}
            </span>
            <input
              type={type ?? 'text'}
              value={fields[key] as string}
              onChange={(e) => update(key, e.target.value)}
              autoComplete="off"
              required={key === 'fullName' || key === 'email'}
            />
          </label>
        ))}
      </div>

      <label className="toggle">
        <input
          type="checkbox"
          checked={fields.showSocial}
          onChange={(e) => update('showSocial', e.target.checked)}
        />
        <span>Show LinkedIn &amp; Facebook icons</span>
      </label>
    </form>
  )
}
