import {TailSpin} from "react-loader-spinner";
import "./index.css";

const Loading = () => {
    return (
        <div className="loading-container">
            <TailSpin color="blue" radius={"8px"} />
        </div>
    )
}

export default Loading;