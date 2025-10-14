import React, { useState, useEffect, Fragment } from 'react'
import './App.css'
import { BaseClient } from "./shared/baseApiClient/baseClient"

interface PokeDex {
    entries: [key: string, value: string][]
}

const App: React.FC<PokeDex> = ({ entries }) => {
    const [poke, setPoke] = useState('bulbasaur/1');
    const [pos, setPos] = useState('Front');
    useEffect(() => {
        getSprite();
    }, [poke, pos]);

    async function makeCall(apiUrl: string): Promise<string> {
        const headers: [string, string][] =
            [
                ['Content-Type', 'image/png'],
                ['Accept', 'image/png']
            ];

        return await BaseClient('GET', apiUrl, null, headers)
            .then(res => res.blob())
            .then(blob => new Promise(callback => {
                const reader = new FileReader();
                reader.onload = function () { callback(this.result as string) };
                reader.readAsDataURL(blob)
            }))
    }

    async function getSprite(): Promise<boolean> {
        const img = document.getElementById('pokemon') as HTMLImageElement;
        if (!img) {
            throw new Error('No element with ID `pokemon`')
        }
        const cacheName = poke + '-' + pos + 'Url';
        const url = localStorage.getItem(cacheName);
        if (url) {
            img.src = url
        }
        else {
            img.src = await makeCall('/Pokemon/Sprites/' + poke + '/' + pos);
            localStorage.setItem(cacheName, img.src);
        }
        return true;
    }

    return (
        <Fragment key='pokemon-container'>
            <div>
                <img id='pokemon' style={{ width: 500, height: 500 }} />
            </div>
            <div>
                <select id='pokeSelection' value={poke} onChange={(e) => setPoke(e.target.value)}>
                    {entries.map(([key, value]) => (
                        <option key={key} value={value + '/' + key}>{value}</option>
                    )
                    )}
                </select>
            </div>
            <div>
                <button onClick={async () => setPos('Front')}>Front</button>
                <button onClick={async () => setPos('Back')}>Back</button>
            </div>
        </Fragment>
    )
}

export default App
