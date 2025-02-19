'use client';

import { getPosts } from '@/action/post.action';
import { Link } from '@/i18n/routing';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

export default function Posts() {
  const t = useTranslations();
  const queryClient = new QueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    initialData: queryClient.getQueryData(['posts']) as any[],
    staleTime: 60 * 2000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='mx-auto max-w-screen-xl p-5'>
      <h1 className='text-2xl'>{t('title')}</h1>
      <div className='grid grid-cols-4 gap-5'>
        {data?.map((item) => (
          <Link
            href={{
              pathname: `/posts/[id]`,
              params: { id: item.id }
            }}
            key={item.id}
            className='border border-gray-300 p-4 text-center'
          >
            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
}
