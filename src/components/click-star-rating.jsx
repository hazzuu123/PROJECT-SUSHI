import React, { useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

/** 리뷰작성자가 매기는 평점 */
const ClickStarRating = ({ setReviewRating }) => {
    const [selectedStars, setSelectedStars] = useState(0) // 선택한 별의 개수
    const fullStars = 5
    return (
        <div className=" flex text-yellow-300">
            {Array.from({ length: fullStars }, (_, index) => (
                <Star
                    key={index}
                    selected={selectedStars > index}
                    onSelect={() => {
                        setSelectedStars(index + 1);
                        setReviewRating((index + 1) * 1.0)
                        { console.log((index + 1) * 1.0) }
                    }}
                />
            ))}
        </div>
    )
}

const Star = ({ selected = false, onSelect = f => f }) => {
    // 선택한 칸수만큼 <BsStarFill>로 채움
    // 선택하지 않은 칸수는 <BsStar>로 채움
    return selected ? (
        <BsStarFill onClick={onSelect} />
    ) : (
        <BsStar onClick={onSelect} />
    );

}

export default ClickStarRating;