'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();

  return (
    <>
      <Button className='ml-1'>{t('title')}</Button>
    </>
  );
}
