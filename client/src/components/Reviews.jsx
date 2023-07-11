import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
    console.log('Reviews prop:', reviews);
    if (!reviews || reviews.length === 0) {
        return <p>No reviews available.</p>;
    }
    return (
        <div className="row row-cols-3 mb-2">
            {reviews.map((review) => {
                console.log('Review:', review);
                return (
                    <div
                        key={review.id}
                        className="card text-white bg-primary mb-3 mr-4"
                        style={{ maxWidth: '30%', marginRight: 20 }}
                    >
                        <div className="card-header d-flex justify-content-between">
                            <span>{review.name}</span>
                            <span>
                <StarRating rating={review.rating} />
              </span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{review.review}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Reviews;

