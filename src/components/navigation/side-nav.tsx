import { useNavigate } from "react-router";
import React from "react";
import { type NavigationProps } from './navigation'

const divStyles: React.CSSProperties = {
    margin: 0,
    padding: 0,
    position: "absolute",
    top: "2em",
    left: "1em",
    right: "1em",
    bottom: "auto",
    inset: "auto 1em auto 1em",
    backgroundColor: "lightgrey",
    width: "15em",
    height: "fit-content"
};

const styles: React.CSSProperties = {
    listStyleType: "none",
    display: "inline-flex",
};

const childStyles: React.CSSProperties = {
    display: "inline-flex",
};

const SideNav: React.FC<NavigationProps> = (props) => {
    const navigate = useNavigate();

    return (
        <div style={divStyles}>
            <div id="side-nav-container">
                <ul style={styles}>
                    {props.routes.map((route) => (
                        <li key={route.key}>
                            <button onClick={() => navigate(route.value)}>{route.key}</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="side-nav-child-container" style={childStyles}>
                {props.children}
            </div>
        </div>
    )
}

export default SideNav