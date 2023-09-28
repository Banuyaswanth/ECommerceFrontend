import "./index.css";

function SpecificationsCard(props) {
    let {productItemDetails} = {...props};
    let {specifications} = {...productItemDetails};

    return (
        <ul className="specifications-list">
            {Object.keys(specifications).sort().map((item) => 
            <li className="specification">
                {`${specifications[item]} ${item.split("_").join(" ")}`}
            </li>
            )}
            <div className="specifications-button-container">
                <button className="specifications-button">Add to Cart</button>
                <button className="specifications-button">Buy Now</button>
            </div>
        </ul>
    )
}

export default SpecificationsCard;