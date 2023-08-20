import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

export default function StarRating({ value, maxValue }) {
  const starCount = 5;
  const fullStars = Math.floor((value / maxValue) * starCount);
  const halfStar = (value / maxValue) * starCount - fullStars >= 0.5;
  const emptyStars = starCount - fullStars - (halfStar ? 1 : 0);

  console.log('full', value, maxValue, fullStars)

  return (
    <div className="flex text-yellow-300">
      {Array.from({ length: fullStars }, (_, index) => (
        <BsStarFill key={index} />
      ))}
      {halfStar && (
        <BsStarHalf />
      )}
      {Array.from({ length: emptyStars }, (_, index) => (
        <BsStar key={index} />
      ))}
    </div>
  );
}