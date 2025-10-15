import { useNavigate } from "react-router";
import React from "react";

interface NavItems {
    routes: [key: string, value: string][]
}

const styles: React.CSSProperties = {
    margin: 0,
    padding: 0,
    listStyleType: "none"
};

const routes: [string, string][] =
    [
        ['Home', '/'],
        ['Pokemon Viewer', '/Viewer']
    ];
    
const TopNav: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <ul style={styles}>
                {routes.map(([key, value]) => (
                    <li key={key}>
                        <button onClick={() => navigate(value)}>{key}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TopNav