import React, {useState} from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const AddReview = () => {
    const {id} = useParams();
    let navigate = useNavigate()
    const location = useLocation()
    const [name, setName] = useState("");
    const [reviewText, setReviewText] = useState("")
    const [rating, setRating] = useState("Rating");

    const refreshPage= () => {
        window.location.reload(false);
    }
    const handleSubmitReview = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post(`/${id}/addReview`, {
                name: name,
                review: reviewText,
                rating: rating
            });
            refreshPage()
            navigate(location.pathname);
        } catch(err) {
            console.log(err)
        }

    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Review</h5>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        id="name"
                                        type="text"
                                        className="form-control mb-2"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="rating">Rating</label>
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                        id="rating" className="form-control mb-2">
                                        <option disabled>Select rating</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="review">Review</label>
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        id="review"
                                        className="form-control mb-2"
                                        rows="3"
                                        placeholder="Write your review"
                                    ></textarea>
                                </div>
                                <button type="submit" onClick={handleSubmitReview} className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AddReview;

// import React from 'react'
//
// const AddReview = () => {
//     return (
//         <div className="mb-2">
//             <form action="">
//                 <div className="form-row">
//                     <div className="form-group col-8">
//                         <label htmlFor="name">Name</label>
//                         <input id="name" placeholder="name" type="text" className="form-control"/>
//                     </div>
//                     <div className="form-group col-4">
//                         <label htmlFor="rating">Rating</label>
//                         <select id="rating" className="custom-select">
//                             <option disabled>Rating</option>
//                             <option value="1">1</option>
//                             <option value="2">2</option>
//                             <option value="3">3</option>
//                             <option value="4">4</option>
//                             <option value="5">5</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="Review">Review</label>
//                     <textarea id="Review" className="form-control"></textarea>
//                 </div>
//                 <button className="btn btn-primary">Submit</button>
//             </form>
//         </div>
//     )
// }
//
// export default AddReview;
