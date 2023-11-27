import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import MainScreen from './../components/MainScreen';

export default async function Home() {
  
  const supabase = createServerComponentClient({cookies});
  const {data} = await supabase.auth.getSession()
  
  if(!data.session){
    redirect('/login')
  }

  return (
    <main className='flex relative h-[100vh] w-[100vw]' >
      <MainScreen/>
    </main>
  )
}
