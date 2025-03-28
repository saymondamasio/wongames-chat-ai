import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get('chat-model');

  return <div>
    OLA
  </div>
}
