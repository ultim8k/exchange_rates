import "./App.css";
import RatesTable from "./components/RatesTable/RatesTable";

const awesome = import.meta.env.VITE_KOSTAS_IS_AWESOME || false;

const App = () => (
  <>
    <a title="Exchange Rates web app" href="/" className="logo">
      <img src="/blob.svg" alt="logo" />
    </a>
    <h1 className="page-title">Exchange Rates</h1>

    <RatesTable />

    {awesome && <span className="☺️">☺️</span>}
  </>
);

export default App;
