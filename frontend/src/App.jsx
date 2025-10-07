import Recipes from "./Recipes";
import "@fontsource/pacifico";

function App() {
  return (
    <div>
      <header>
        <h1>InstandGramen</h1>
        <div>
          <a href="">Recipes</a>
          <a href="">About us</a>
          <a href="">Contact</a>
        </div>
      </header>

      <Recipes />

      <footer>
        <div>
          <a href="">About us</a>
          <a href="">Contract</a>
          <a href="">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
