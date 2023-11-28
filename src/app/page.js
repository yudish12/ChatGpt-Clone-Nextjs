import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import MainScreen from './../components/MainScreen';

export default async function Home() {
  const cookieStore = cookies()
  console.log(cookieStore.getAll(),8)
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const {data} = await supabase.auth.getSession()
  
  if(!data.session){
    console.log("as")
    redirect('/login')
  }

  return (
    <main className='flex relative h-[100vh] w-[100vw]' >
      <MainScreen/>
    </main>
  )
}
