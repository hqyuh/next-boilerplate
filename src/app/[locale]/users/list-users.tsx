'use client';

import { Link } from '@/i18n/routing';
import { getUsers } from '@/utils/api-requests';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

export default function ListUsers() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    staleTime: 60 * 2000
  });

  const t = useTranslations();

  return (
    <main className='mx-auto max-w-screen-xl p-5'>
      <h1 className='text-2xl'>{t('title')}</h1>
      <div className='grid grid-cols-4 gap-5'>
        {data?.map((user) => (
          <Link
            href={{
              pathname: `/users/[id]`,
              params: { id: user.id }
            }}
            key={user.id}
            className='border border-gray-300 p-4 text-center'
          >
            <h3>{user.name}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
