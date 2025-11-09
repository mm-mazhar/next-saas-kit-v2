// app/components/auth/EmailAuthForm.tsx

'use client'

import { createClient } from '@/app/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function EmailAuthForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: 'error' | 'success'
    text: string
  } | null>(null)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({
        type: 'success',
        text: 'Check your email for the magic link!',
      })
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleEmailLogin} className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Magic Link'}
      </Button>

      {message && (
        <div
          className={`text-sm p-3 rounded text-center ${
            message.type === 'error'
              ? 'bg-destructive/10 text-destructive border border-destructive/20'
              : 'bg-primary/10 text-primary border border-primary/20'
          }`}
        >
          {message.text}
        </div>
      )}
    </form>
  )
}
