import React, { useState, useEffect, Fragment } from 'react'
import './App.css'
import { useNavigate } from 'react-router'
import TopNav from "./components/navigation/top-nav"

const App: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <TopNav/>
            <h1>Hello!</h1>
            <div>
                <button onClick={() => { navigate('/Viewer') }}>Let's check out some Pokemon!</button>
            </div>
        </div>

    )
}

export default App
