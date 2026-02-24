import { Background } from './components/Background';
import { Profile } from './components/Profile';
import { Socials } from './components/Socials';
import { Quote } from './components/Quote';
import { ActivityCard } from './components/ActivityCard';
import { GodplayButton } from './components/GodplayButton';
import { Footer } from './components/Footer';
import { ScrollReveal } from './components/ScrollReveal';
import './App.css';

function App() {
  return (
    <>
      <Background />
      <main className="app">
        <Profile />
        <Socials />
        <Quote />
        <div className="app__cards">
          <ScrollReveal className="app__card-wrap">
            <ActivityCard />
          </ScrollReveal>
        </div>
        <ScrollReveal className="app__card-wrap">
          <GodplayButton />
        </ScrollReveal>
        <Footer />
      </main>
    </>
  );
}

export default App;
