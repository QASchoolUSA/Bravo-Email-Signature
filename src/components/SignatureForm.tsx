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
    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fieldLabels.map(({ key, label, hint, type }) => (
          <div key={key} className={`flex flex-col gap-1.5 ${key === 'address' ? 'sm:col-span-2' : ''}`}>
            <div className="flex justify-between gap-2 text-[11px] font-semibold tracking-[0.06em] text-accent uppercase">
              <label htmlFor={key} className="cursor-pointer">
                {label}
              </label>
              {hint ? <span className="font-medium tracking-normal text-grey normal-case">{hint}</span> : null}
            </div>
            <input
              id={key}
              type={type ?? 'text'}
              value={fields[key] as string}
              onChange={(e) => update(key, e.target.value)}
              autoComplete="off"
              required={key === 'fullName' || key === 'email'}
              className="w-full border border-[#d4dee6] bg-white px-3 py-2.5 text-[0.92rem] font-medium text-charcoal outline-none transition duration-150 focus:border-sky focus:ring-3 focus:ring-sky/20"
            />
          </div>
        ))}
      </div>

      <label htmlFor="showSocial" className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
        <input
          id="showSocial"
          type="checkbox"
          checked={fields.showSocial}
          onChange={(e) => update('showSocial', e.target.checked)}
          className="h-4 w-4 accent-navy"
        />
        <span>Show LinkedIn &amp; Facebook icons</span>
      </label>
    </form>
  )
}
