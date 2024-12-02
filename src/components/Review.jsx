// src/components/Review.js
import React, { useState } from "react";
import '../styles/Review.css';

const Review = ({ taskId, freelancerId }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle review submission logic
    console.log(`Review for Freelancer ${freelancerId} on Task ${taskId}:`, { review, rating });
  };

  return (
    <div>
      <h2>Review Freelancer for Task {taskId}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          required
        />
        <div>
          <label>Rating: </label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Review;
