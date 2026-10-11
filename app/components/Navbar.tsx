"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'

const Navbar = () => {
    const pathname = usePathname()
    const t = useTranslations('Nav')

    return (
        <nav className='bg-white shadow p-3 flex justify-center gap-3'>
            <Link
                href="/"
                className={`rounded px-3 py-1 text-sm ${pathname === '/' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {t('todo')}
            </Link>
            <Link
                href="/about"
                className={`rounded px-3 py-1 text-sm ${pathname === '/about' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
                {t('about')}
            </Link>
        </nav>
    )
}

export default Navbar