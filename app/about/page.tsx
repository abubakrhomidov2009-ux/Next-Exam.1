import { useTranslations } from 'next-intl'
import Link from 'next/link'
import LanguageSwitcher from '../components/LanguageSwitcher'

const About = () => {
    const t = useTranslations('About')

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
    <div className='max-w-md mx-auto'>
        <LanguageSwitcher />

        <div className='bg-white rounded-xl shadow p-6 text-center'>
            <h1 className='font-bold text-xl mb-4'>{t('title')}</h1>
            <p>{t('name')}</p>
            <p>{t('job')}</p>
            <p>{t('city')}</p>
            <p>{t('hobby')}</p>
        </div>
    </div>
    </div>
  )
}

export default About