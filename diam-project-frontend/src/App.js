import {Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Login from './Login.js';
import Signup from './Signup.js';
import AnuncioProviderView from './AnuncioProviderView.js';
import AnuncioClientView from "./AnuncioClientView";
import CreateAnuncio from './CreateAnuncio.js';
import Search from './Search.js';
import {PrimeReactProvider, PrimeReactContext} from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


function App() {
    return (
        <PrimeReactProvider>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/sobre" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/anuncio" element={<AnuncioProviderView/>}/>
                <Route path="/anuncio/criar-anuncio" element={<CreateAnuncio/>}/>
                <Route path="/search/ver-anuncios" element={<Search/>}/>
                <Route path="/search/ver-anuncios/detalhes-anuncio/:anuncio_id" element={<AnuncioClientView />} />
            </Routes>
        </PrimeReactProvider>
    );
}

export default App;