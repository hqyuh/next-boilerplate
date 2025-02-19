import { getPosts } from '@/action/post.action';
import { currentUser } from '@clerk/nextjs/server';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import Posts from './posts';

export default async function Page() {
  const queryClient = new QueryClient();
  const user = await currentUser();

  await queryClient.prefetchQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts()
  });

  return (
    <div>
      <div className='pl-2 text-2xl'>Hi {user?.username}</div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Posts />
      </HydrationBoundary>
    </div>
  );
}
