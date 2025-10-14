import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import './index.css'
import App from './App.tsx'
import { BaseClient } from "./shared/baseApiClient/baseClient.ts"

async function loadPokeDex(): Promise<[key: string, value: string][]> {
    return await BaseClient('GET', '/Pokemon/Dex')
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
