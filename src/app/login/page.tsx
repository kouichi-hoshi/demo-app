import { login, signup } from '@/login/actions'
import { createClient } from '@/_lib/supabase/server'
import SignOutButton from '@/login/SignOutButton'

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    console.error('Error fetching user:', error.message)
  }

  return (
    <div className='container mx-auto my-6'>
      <h2 className='mb-6 text-3xl'>supabaseログインテスト</h2>
      <div className='my-4'>
        {user ? `supabaseにログインしています。: ${user.email}` : 'supabaseにログインしていません'}
      </div>

      <form>
        <div className='mb-4 flex flex-col gap-4'>
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type='email' required className='border-2 p-2' />
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' required className='border-2 p-2' />
        </div>
        <button className='mr-2 border-2 p-2' formAction={login}>
          Log in
        </button>
        <button className='border-2 p-2' formAction={signup}>
          Sign up
        </button>
      </form>
      <div className='mt-6'>
        <SignOutButton />
      </div>
    </div>
  )
}
