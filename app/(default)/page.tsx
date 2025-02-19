export const metadata = {
  title: 'ZioNotes',
  description: 'ZioNotes is AWESOME :D',
}

import Hero from '@/components/hero'
import Features from '@/components/features'
import Newsletter from '@/components/newsletter'
import Zigzag from '@/components/zigzag'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <Zigzag />
      <Features />
      <Testimonials />
      <Newsletter />
    </>
  )
}
