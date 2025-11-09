import './nav.css'
import { useNavigate } from "react-router";
import React from "react";
import { type NavigationProps } from './navigation'

const Navigation: React.FC<NavigationProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div id={props.id}>
            <div className="nav-container">
                <ul className="nav-routes">
                    {props.routes.map((route) => (
                        <li key={route.key}>
                            <button onClick={() => navigate(route.value)}>{route.key}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="nav-child-container">
                {props.children}
            </div>
        </div>
    )
}

export default Navigation