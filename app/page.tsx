import Header from "./components/Header";
import Hero from "./components/Hero";
import Modelo from "./components/Modelo";
import Servicios from "./components/Servicios";
import Planes from "./components/Planes";
import WhyNoddo from "./components/WhyNoddo";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Modelo />
        <Servicios />
        <Planes />
        <WhyNoddo />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}
