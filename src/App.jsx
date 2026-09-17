import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SectionDivider from "./components/SectionDivider.jsx";
import Milestones from "./components/Milestones.jsx";
import Journey from "./components/Journey.jsx";
import Tactics from "./components/Tactics.jsx";
import Clans from "./components/Clans.jsx";
import QuoteSection from "./components/QuoteSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "5rem", background: "var(--surface)", minHeight: "100vh" }}>
        <Hero />
        <SectionDivider />
        <Milestones />
        <Journey />
        <Tactics />
        <Clans />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
