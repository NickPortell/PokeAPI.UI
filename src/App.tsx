import { useState } from 'react'
import './App.css'

function App() {
    const baseUrl = 'https://localhost:5000'
    const [poke, setPoke] = useState('');
    const [pos, setPos] = useState('');

    async function makeCall(apiUrl: string): Promise<string> {
        const headers: Headers = new Headers()
        headers.set('Content-Type', 'image/png')
        headers.set('Accept', 'image/png')
        headers.set('Access-Control-Allow-Origin', '*')

        const request: RequestInfo = new Request(apiUrl, {
            method: 'GET',
            headers: headers
        })

        return await fetch(request)
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
            img.src = await makeCall(baseUrl + '/api/Pokemon/Sprites/' + poke + '/' + pos);
            localStorage.setItem(cacheName, img.src);
        }
        return true;
    }

    async function showFront() {
        setPos('Front');
        await getSprite();
    }

    async function showBack() {
        setPos('Back');
        await getSprite();
    }

    return (
        <>
            <div><img id='pokemon' style={{ width: 500, height: 500 }} /></div>
            <div>
                <select id='pokeSelection' value={poke} onChange={(e) => setPoke(e.target.value)}>
                    <option value='ditto/132'>Ditto</option>
                    <option value='mewtwo/150'>MewTwo</option>
                    <option value='mew/151'>Mew</option>
                    <option value='bulbasaur/1'>Bulbasaur</option>
                </select>
            </div>
            <div>
                <button onClick={async () => await showFront()}>Front</button>
                <button onClick={async () => await showBack()}>Back</button>
            </div>
        </>
    )
}

export default App
