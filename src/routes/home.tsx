import { useNavigate } from "react-router";

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div id="main-content-container">
                <h1>Hello!</h1>
                <div>
                    <button onClick={() => { navigate('/Viewer') }}>Let's check out some Pokemon!</button>
                </div>
            </div>
        </div>
    )
}

export default Landing