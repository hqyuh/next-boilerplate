import { getPostById } from '@/action/post.action';

export default async function UserDetail({ params: { id } }: { params: { id: string } }) {
  const data = await getPostById(id);

  return <div>{data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>}</div>;
}
