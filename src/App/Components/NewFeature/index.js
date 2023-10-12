import { useNavigate } from "react-router-dom";
import "./index.css";

const NewFeature = () => {
    const navigate = useNavigate();
    const comingSoonUrl = "https://cdn.dribbble.com/users/88000/screenshots/2487367/shot.png";

    const GoBack = () => {
        navigate(-1);
    }

    return (
        <div className="new-feature-container">
            <img src={comingSoonUrl} alt="coming soon" className="coming-soon-image"/>
            <button className="go-back-button" onClick={GoBack}>Go Back</button>
        </div>
    )
}

export default NewFeature;