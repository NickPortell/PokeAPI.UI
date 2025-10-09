import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.tsx'

const baseUrl = 'http://' + window.location.hostname + ':5000/api';

async function loadPokeDex(): Promise<[key: string, value: string][]> {
    const headers: Headers = new Headers()
    headers.set('Content-Type', 'image/png')
    headers.set('Accept', 'image/png')
    headers.set('Access-Control-Allow-Origin', '*')

    const request: RequestInfo = new Request(baseUrl + '/Pokemon/Dex', {
        method: 'GET', headers: headers
    })

    return await fetch(request)
        .then(res => res.json())
        .then(json => Object.entries<string>(json))
}

const pokeDex = await loadPokeDex();
const router = createBrowserRouter(
    [{
        path: '/',
        element: <App entries={pokeDex}
        />
    }]
);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
