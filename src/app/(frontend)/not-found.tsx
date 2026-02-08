import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='mb-4 font-bold text-6xl text-primary'>404</h1>
        <h2 className='mb-6 font-semibold text-2xl text-black'>Strona nie znaleziona</h2>
        <p className='mb-8 text-text'>Przepraszamy, ale strona której szukasz nie istnieje.</p>
        <Link className='btn btn-primary' href='/'>
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  )
}
