import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Layout from './utils/Layout'
import Hero from './utils/Hero'
import Grid from './utils/Grid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Layout>
      <main>
        <Hero />
        <Grid />
      </main>
    </Layout>
  )
}

export default App
