"use client"

import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'

const LanguageSwitcher = () => {
    const locale = useLocale()
    const router = useRouter()

    const change = (lang:string) => {
        document.cookie = `locale=${lang}; path=/; max-age=31536000`
        router.refresh()
    }

    return (
        <div className='flex justify-center gap-2 mb-4'>
            {["en","ru","taj"].map((lang) => (
                <button
                    key={lang}
                    onClick={() => change(lang)}
                    className={`rounded px-3 py-1 text-sm ${locale === lang ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                    {lang.toUpperCase()}
                </button>
            ))}
        </div>
    )
}

export default LanguageSwitcher