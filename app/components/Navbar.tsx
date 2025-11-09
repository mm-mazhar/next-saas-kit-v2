// app/components/Navbar.tsx

import { createClient } from '@/app/lib/supabase/server'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Textlogo from './Textlogo'
import { Themetoggle } from './Themetoggle'
import { UserNav } from './UserNav'
// import { Imagelogo } from './ImageLogo'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user metadata for display
  const userName =
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <nav className='border-b bg-background h-[10vh] flex items-center'>
      <div className='w-full flex items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* ---- LEFT SIDE (Child 1) ---- */}
        <Textlogo />
        {/* <Imagelogo /> */}
        {/* ---- RIGHT SIDE WRAPPER (Child 2) ---- */}
        <div className='flex items-center gap-x-2'>
          {/* Conditional auth buttons */}
          {user ? (
            <UserNav
              email={user.email as string}
              image={user.user_metadata?.avatar_url}
              name={userName}
            />
          ) : (
            <Link href='/login'>
              <Button size='lg'>Get Started</Button>
            </Link>
          )}

          {/* Theme toggle */}
          <Themetoggle />
        </div>
      </div>
    </nav>
  )
}
