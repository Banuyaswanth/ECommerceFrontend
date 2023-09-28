import "./index.css";
import CompareImageCard from "../CompareImageCard";
import SpecificationsCard from "../SpecificationsCard";

function Compare() {
    const productItemIdFirst = "A117DC1F-4B2F-4194-962E-1A2C2AB38CCF";
    const productItemIdSecond = "D24B070A-03AB-49A6-AB8F-E924BF1CD1A2";

    let firstProduct = JSON.parse(localStorage.getItem(productItemIdFirst))
    let secondProduct = JSON.parse(localStorage.getItem(productItemIdSecond))

    // let [firstProduct, setFirstProduct] = useState({});
    // let [secondProduct, setSecondProduct] = useState({});
    // let [loading, setIsLoading] = useState(true);
    // let [errorMsg, setErrorMsg] = useState("");

    // const GetProductItemData = async(productItemId,id) => {
    //     try{
    //         var url = `https://localhost:7258/api/Product/${productItemId}`;
    //         var response = await fetch(url);
    //         if(response.ok) {
    //             var responseData = await response.json();
    //             localStorage.setItem(productItemId,JSON.stringify(responseData));
    //             id === 1 ? setFirstProduct(responseData) : setSecondProduct(responseData);
    //         }
    //         else{
    //             setErrorMsg("Unable to fetch the data")
    //         }
    //     }
    //     catch(err) {
    //         console.log(err);
    //         setErrorMsg("Something went wrong. Try again after some time")
    //     }
    // }

    // useEffect(()=>{
    //     GetProductItemData(productItemIdFirst,1);
    //     GetProductItemData(productItemIdSecond,2);
    //     setIsLoading(false);
    // }, [])

    return (
        <div className="compare-page">
            <div className="compare-product-image-section">
                {<CompareImageCard {...firstProduct}/>}
                {<CompareImageCard {...secondProduct}/>}
            </div>
            <div className="compare-section">
                <div className="compare-section-heading">Specifications</div>
                <div className="compare-specifications">
                    {<SpecificationsCard {...firstProduct}/>}
                    {<SpecificationsCard {...secondProduct}/>}
                </div>
            </div>
        </div>
    )
}

export default Compare;