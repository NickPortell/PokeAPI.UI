import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import PokeView from './routes/pokeview.tsx';
import { BaseClient } from "./shared/baseApiClient/baseClient.ts";
import TopNav from "./components/navigation/top-nav"
import SideNav from './components/navigation/side-nav'
import Landing from './routes/home.tsx';
import { type NavItem } from './components/navigation/navigation.ts'

async function loadPokeDex(): Promise<[key: string, value: string][]> {
    return await BaseClient('GET', '/Pokemon/Dex')
        .then(res => res.json())
        .then(json => Object.entries<string>(json))
}
const pokeDex = await loadPokeDex();

const topNavRoutes: NavItem[] =
    [
        { key: 'Home', value: '/' },
        { key: 'Pokemon Viewer', value: '/Viewer' }
    ];

const sideNavRoutes: NavItem[] =
    [
        { key: 'Home', value: '/' },
        { key: 'Pokemon Viewer', value: '/Viewer' }
    ];

const App: React.FC = () => {

    return (
        <div id="app-container">
            <BrowserRouter>
                <TopNav routes={topNavRoutes}>
                    <SideNav routes={sideNavRoutes}>
                        <Routes>
                            <Route path='/' element={<Landing />} />
                            <Route path='/Viewer' element={<PokeView entries={pokeDex} />} />
                        </Routes>
                    </SideNav>
                </TopNav>
            </BrowserRouter>
        </div>
    )
}

export default App
