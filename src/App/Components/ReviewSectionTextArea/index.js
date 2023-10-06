import { useState } from "react";
import "./index.css";

const ReviewSectionTextArea = (props) => {
    let {reviewText} = props;

    let [newReviewText, setNewReviewText] = useState(reviewText); 

    const HandleTextareaChange = (event) => {
        setNewReviewText(event.target.value)
    }

    const GetTextOfTextArea = () => {
        return newReviewText;
    }

    return (
        <div className="add-review-field-container">
            <span>Description</span>
            <textarea onChange={HandleTextareaChange} value={newReviewText} rows={8} className="add-review-text-area-field" placeholder="Write your review here..." name="review-section-textarea" id="review-section-textarea-id" />
        </div>
    )
}

export default ReviewSectionTextArea;