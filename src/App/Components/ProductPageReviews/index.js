import {useState, useEffect} from "react";
import {TailSpin} from "react-loader-spinner";
import {BsFillStarFill} from "react-icons/bs";
import {AiOutlineLeft,AiOutlineRight} from "react-icons/ai"
import ReviewCard from "../ReviewCard";
import ReviewSectionTextArea from "../ReviewSectionTextArea";
import "./index.css";

const ProductRatingsAndReviews = () => {
    let productId = "784DD15C-5C16-4BAE-A5F7-BDDAC0B82686";
    let customerId = "BDB52F9F-92BE-44E3-BD23-61CD36B513BF";
    const [reviewSummary, setReviewSummary] = useState({});
    let [reviewPage, setReviewPage] = useState(1);
    let [reviewFetchStatus, setReviewFetchStatus] = useState("loading");
    let [sortingOnRatingAsc, setSortingOnRatingAsc] = useState(false);
    let [rating, setRating] = useState(0);
    let [reviewable, setReviewable] = useState(false);
    let [existingReviewData, setExistingReviewData] = useState({});
    let [reviewText, setReviewText] = useState("") ;
    let stars = [1,2,3,4,5];

    let somethingWentWrongImageUrl = "https://cdn.dribbble.com/users/1078347/screenshots/2799566/oops_1x.png";
    let noReviewImageUrl = "https://1.bp.blogspot.com/-7gAG1CS_-GY/YR7XD-axEZI/AAAAAAAAKrw/-5poKoXRiMon490omdLK8B7qH-hsc_EcQCLcBGAsYHQ/w1200-h630-p-k-no-nu/Making-Ratings-and-Reviews-better-for-users-developers-v2.png";
    
    const GetReviews = async() => {
        try{
            let reviewFetchUrl = `https://localhost:7258/api/Review/all/${productId}?sortOnRatingAsc=${sortingOnRatingAsc}&page=${reviewPage}`;
            let response = await fetch(reviewFetchUrl);
            if(response.ok) {
                let responseData = await response.json();
                setReviewSummary(responseData);
                setReviewFetchStatus("success");
            }
            else {
                setReviewFetchStatus("failure");
            }
        }
        catch(err) {
            setReviewFetchStatus("failure");
        }
    }

    const HandleRateProduct = async() => {
        try {
            let isProductReviewableUrl = `https://localhost:7258/api/Review/IsProductReviewable/${customerId}/${productId}`;
            let response = await fetch(isProductReviewableUrl);
            if(response.ok){
                setReviewable(true);
                let fetchReviewUrl = `https://localhost:7258/api/Review/IsReviewPresent/${customerId}/${productId}`;
                let reviewResponse = await fetch(fetchReviewUrl);
                if(reviewResponse.ok) {
                    let reviewData = await reviewResponse.json();
                    if (reviewData.isAvailable) {
                        setReviewText(reviewData.review.review)
                    }
                    setExistingReviewData(reviewData);
                }
            }
        }
        catch(err) {

        }
    }

    const HandleStarClick = (star) => {
        setRating(star);
    }

    const GetToolTipText = (index) => {
        switch (index) {
            case 1 :
                return "Very Bad";
            case 2:
                return "Bad";
            case 3:
                return "Good";
            case 4:
                return "Very Good";
            case 5:
                return "Excellent"
            default:
                return "";
        }
    }

    const ChangeSortOrder = (event) => {
        setSortingOnRatingAsc(event.target.value === "negative");
    }

    const PreviousReviewsPage = () => {
        setReviewPage((prev) => prev-1);
    }

    const NextReviewsPage = () => {
        setReviewPage((prev) => prev+1);
    }

    useEffect(() => {
        GetReviews();
    }, [reviewPage,sortingOnRatingAsc])

    const GetJsx = () => {
        if(reviewFetchStatus === "success") {
            return (
                <div className="reviews-section-container">
                    <div className="reviews-section-header">
                        <h1 className="reviews-section-heading">Ratings & Reviews</h1>
                        <button className="rate-product-button box-shadow-class">Rate Product</button>
                    </div>
                    <div className="box-shadow-class add-rating-review-fields-container">
                        <h2 className="add-rating-prompt-heading">Rate this product*</h2>
                        <div className="rating-icons-and-text-container">
                            {stars.map((star) => <span key={star} className="star-tooltip-container">
                                <BsFillStarFill className="add-rating-star-icon" onClick={() => HandleStarClick(star)} color={star<=rating ? "yellow" : "lightgray"}/>
                                <span className="rating-tooltip">{GetToolTipText(star)}</span>
                            </span>)}
                            <span className="given-rating-text" style={{color: rating >=3 ? "green" : rating===2 ? "orange" : "red"}}>{GetToolTipText(rating)}</span>
                        </div>
                        <hr/>
                        <h2 className="add-rating-prompt-heading">Review this product</h2>
                        <ReviewSectionTextArea reviewText={reviewText}/>
                        <div className="review-section-buttons-container">
                            <button className="review-section-cancel-btn review-section-btns">Cancel</button>
                            <button className="review-section-btns review-section-submit-btn">Submit</button>
                        </div>
                    </div>
                    <div className="reviews-summary">
                        <div className="average-total-reviews-ratings-container">
                            <div>
                                <span className="average-product-rating">{reviewSummary.averageRating}</span>
                                <BsFillStarFill fontSize="24px" color="black"/>
                            </div>
                            <p className="total-reviews-ratings">{reviewSummary.totalRatings} Ratings & <br/> {reviewSummary.totalReviews} Reviews</p>
                        </div>
                        <hr className="vertical-separation"/>
                        <ul className="individual-ratings-list">
                            <li className="individual-rating-list-item">
                                <div className="star-rating-container">
                                    <span className="rating">5</span>
                                    <BsFillStarFill fontSize="11px" color="black"/>
                                </div>
                                <div className="progress-bar-outer-container">
                                    <div className="progress-bar-inner-container" style={{width: `${Math.ceil((reviewSummary.fiveStarRatings/reviewSummary.totalRatings)*100)}%`, backgroundColor:"green"}}></div>
                                </div>
                                <p className="individual-rating-number">{reviewSummary.fiveStarRatings}</p>
                            </li>
                            <li className="individual-rating-list-item">
                                <div className="star-rating-container">
                                    <span className="rating">4</span>
                                    <BsFillStarFill fontSize="11px" color="black"/>
                                </div>
                                <div className="progress-bar-outer-container">
                                    <div className="progress-bar-inner-container" style={{width: `${Math.ceil((reviewSummary.fourStarRatings/reviewSummary.totalRatings)*100)}%`, backgroundColor:"green"}}></div>
                                </div>
                                <p className="individual-rating-number">{reviewSummary.fourStarRatings}</p>
                            </li>
                            <li className="individual-rating-list-item">
                                <div className="star-rating-container">
                                    <span className="rating">3</span>
                                    <BsFillStarFill fontSize="11px" color="black"/>
                                </div>
                                <div className="progress-bar-outer-container">
                                    <div className="progress-bar-inner-container" style={{width: `${Math.ceil((reviewSummary.threeStarRatings/reviewSummary.totalRatings)*100)}%`, backgroundColor:"green"}}></div>
                                </div>
                                <p className="individual-rating-number">{reviewSummary.threeStarRatings}</p>
                            </li>
                            <li className="individual-rating-list-item">
                                <div className="star-rating-container">
                                    <span className="rating">2</span>
                                    <BsFillStarFill fontSize="11px" color="black"/>
                                </div>
                                <div className="progress-bar-outer-container">
                                    <div className="progress-bar-inner-container" style={{width: `${Math.ceil((reviewSummary.twoStarRatings/reviewSummary.totalRatings)*100)}%`, backgroundColor:"orange"}}></div>
                                </div>
                                <p className="individual-rating-number">{reviewSummary.twoStarRatings}</p>
                            </li>
                            <li className="individual-rating-list-item">
                                <div className="star-rating-container">
                                    <span className="rating">1</span>
                                    <BsFillStarFill fontSize="11px" color="black"/>
                                </div>
                                <div className="progress-bar-outer-container">
                                    <div className="progress-bar-inner-container" style={{width: `${Math.ceil((reviewSummary.oneStarRatings/reviewSummary.totalRatings)*100)}%`, backgroundColor:"red"}}></div>
                                </div>
                                <p className="individual-rating-number">{reviewSummary.oneStarRatings}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="sorting-select-container">
                        <select value={sortingOnRatingAsc ? "negative" : "positive"} name="review-section-sort-select" id="review-section-sort-select-id" onChange={(event)=>ChangeSortOrder(event)} className="rating-sort-select-element box-shadow-class">
                            <option value="positive">Positive First</option>
                            <option value="negative">Negative First</option>
                        </select>
                    </div>
                    {reviewSummary.reviews.length === 0 && <div className="no-reviews-container">
                        <img className="no-reviews-image" src={noReviewImageUrl} alt="no reviews"/>
                        <h3 className="no-reviews-heading">No Reviews available for the product yet</h3>
                        <p className="no-reviews-content">Be the first to review this product</p>
                    </div>}
                    {reviewSummary.reviews.length > 0 && <ul className="reviews-list">
                        {reviewSummary.reviews.map((review) => <ReviewCard key={review.productReviewId} {...review}/>)}
                    </ul>}
                    <div className="reviews-section-pagination-container">
                        <button disabled={reviewPage <= 1} onClick={PreviousReviewsPage} className="pagination-buttons box-shadow-class"><AiOutlineLeft/></button>
                        <span className="pagination-page-information">page {reviewPage} of {Math.ceil(reviewSummary.totalReviews/10)}</span>
                        <button onClick={NextReviewsPage} disabled={reviewPage >= Math.ceil(reviewSummary.totalReviews/10)} className="pagination-buttons box-shadow-class"><AiOutlineRight/></button>
                    </div>
                </div>
            )
        }
        if(reviewFetchStatus === "failure") {
            return (
                <div className="something-went-wrong-container">
                    <img className="someting-went-wrong-image" src={somethingWentWrongImageUrl} alt="something went wrong"/>
                </div>
            )
        }
        return (
            <div className = "loading-container">
                <TailSpin color="blue" radius={"8px"}/>
            </div>
        )
    }

    return (
        <GetJsx/>
    )
}

export default ProductRatingsAndReviews;