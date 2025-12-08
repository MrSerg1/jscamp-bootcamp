import { Header } from "./components/Header.jsx";
import { SearchFormSection } from "./components/SearchFormSection.jsx";
import { SearchResultsSection } from "./components/SearchResultsSection.jsx";
import { Footer } from "./components/Footer.jsx"

function App() {
  return (
    <>
      <Header />
      <main>
        <SearchFormSection />
        <SearchResultsSection />
      </main>
    <Footer />
    </>
  );
}

export default App;
