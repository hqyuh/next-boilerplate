export default async function UserDetail({ params: { id } }: { params: { id: string } }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await res.json();

  return (
    <div>
      {user.name}, {user.username}
    </div>
  );
}
