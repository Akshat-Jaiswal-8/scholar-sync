import Hero from "@/components/hero";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function Home(): React.JSX.Element {
  return (
    <main>
      <Navbar />
      <div>
        <Hero />
        <Footer />
      </div>
    </main>
  );
}
