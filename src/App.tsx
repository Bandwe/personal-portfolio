import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubIntegration from './components/GitHubIntegration'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHubIntegration />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
