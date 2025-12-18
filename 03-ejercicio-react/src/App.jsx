import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"

import { HomePage } from "./pages/Home.jsx"
import { Search } from "./pages/Search.jsx"
import { NotFound } from "./pages/404.jsx"

import { Route } from "./components/Route.jsx"

function App() {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={Search} />
      <Route path="*" component={NotFound} />
      <Footer />
    </>
  );
}

export default App;
