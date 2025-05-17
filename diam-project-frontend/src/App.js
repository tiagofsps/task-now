import {Routes, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contactos from './Contactos';
import Login from './Login';
import Signup from './Signup';
import AnuncioProviderView from './AnuncioProviderView';
import AnuncioClientView from "./AnuncioClientView";
import CreateAnuncio from './CreateAnuncio.js';
import Search from './Search.js';
import ChatWrapper from "./ChatWrapper";
import MensagensLista from "./MensagensLista";
import Profile from './Profile';
import ManageUsers from "./ManageUsers";
import {PrimeReactProvider, PrimeReactContext} from 'primereact/api';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


function App() {
    return (
        <PrimeReactProvider>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contactos" element={<Contactos/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/anuncio" element={<AnuncioProviderView/>}/>
                <Route path="/anuncio/criar-anuncio" element={<CreateAnuncio/>}/>
                <Route path="/search/ver-anuncios" element={<Search/>}/>
                <Route path="/search/ver-anuncios/detalhes-anuncio/:anuncio_id" element={<AnuncioClientView />} />
                <Route path="/chat/:destinatarioId" element={<ChatWrapper />} />
                <Route path="/mensagens" element={<MensagensLista />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin/gerir-utilizadores" element={<ManageUsers/>}/>
            </Routes>
        </PrimeReactProvider>
    );
}

export default App;