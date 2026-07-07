import { Sidebar } from "./components/sidebar/index.jsx";
import { Layout } from './components/layout/layout';
import { Lista } from "./components/list/lista.jsx";

function App({ onLogout }) {

  return (
    <div>
      <Layout
        asideContent={<Sidebar onLogout={onLogout} />}
        mainList={<Lista />}
      />
    </div>
  );
}

export default App;