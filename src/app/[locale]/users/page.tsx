import { getUsers } from '@/utils/api-requests';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import ListUsers from './list-users';

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUsers />
    </HydrationBoundary>
  );
}
