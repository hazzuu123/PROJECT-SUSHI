import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSushi, postReview } from "../../apis/sushi";
import ClickStarRating from "../../components/click-star-rating";
import { FaPencilAlt } from "react-icons/fa"; //react-icons

export const Detail = () => {
  let { id } = useParams();
  const [sushi, setSushi] = useState();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0); // 평점(0 ~ 5)
  const [reviewText, setReviewText] = useState(""); //리뷰

  const fetchSushiDetail = (id) => {
    getSushi(id).then((data) => setSushi(data));
  };

  //평점과 리뷰를 추가
  const handleSubmitReview = (event) => {
    event.preventDefault();
    // reviewRating와 reviewText 변수를 사용하여 리뷰 정보를 서버에 전송
    const token = localStorage.getItem('token')
    let postData = {
      sushiId: id,
      contents: reviewText,
      star: reviewRating, // 0 ~ 5

    };

    postReview(postData, {
      headers: { Authorization: `${token}`, },
    })
      .then((data) => {
        fetchSushiDetail(id);
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    // 처리 후에 리뷰 입력을 초기화하고 폼을 닫는다
    setReviewRating(0);
    setReviewText("");
    setShowReviewForm(false);
  };

  useEffect(() => {
    fetchSushiDetail(id);
  }, []);

  if (sushi) {
    return (
      <>
        {/* 아이디,가게이름,위치,전화번호 */}
        <div>
          <span>아이디: </span>
          {sushi._id}
        </div>
        <div>
          <span>가게이름: </span>
          {sushi.name}
        </div>
        <div>
          <span>주소: </span>
          {sushi.location}
        </div>
        <div>
          <span>전화번호: </span>
          {sushi.phone}
        </div>
        {/* 메뉴*/}
        <ul>
          <span>메뉴: </span>
          {sushi.menus &&
            sushi.menus.map((menu, i) => <li key={menu.name}>{menu.name} </li>)}
        </ul>

        <div>
          {/* 평점 */}
          <span>평점: </span>
          <span>{parseFloat(sushi.starsAvg).toFixed(1)}</span>
          {/* 클릭하면 평점과 리뷰를 작성하는 폼을 화면에 보여준다 */}
          <FaPencilAlt
            onClick={() => setShowReviewForm(!showReviewForm)}
          ></FaPencilAlt>
        </div>
        {showReviewForm && (
          <form onSubmit={handleSubmitReview}>
            <label>
              Rating:
              {/* <input
                type="number"
                step="0.5"
                min="0"
                max="5"
                value={reviewRating}
                onChange={(e) => setReviewRating(parseFloat(e.target.value))}
              /> */}
              {/* 리뷰작성자가 매기는 별점(별 그림) */}
              <ClickStarRating setReviewRating={setReviewRating}></ClickStarRating>
            </label>
            <label>
              Review:
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        )}


      </>
    );
  }
};
