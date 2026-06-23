import { Content } from "./components/sidebar/index.jsx"
import { Layout } from './components/layout/layout'
import { Route } from 'react-router-dom'
import { Lista } from "./components/list/lista.jsx"
import { LayoutCards } from  "./components/dashboards/layout.jsx"
import { ContextData } from './components/context/index.jsx';
import Register from "./components/register/index.jsx"

function App({ onLogout }) {
  return (

    

    <ContextData>
      <div>          
        <Layout asideContent={<Content onLogout={onLogout} />} mainList={<Lista/>}/>
      </div>
    </ContextData>
  );
}

export default App;
