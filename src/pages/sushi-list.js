import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSushiList, getSushi, postReview } from "../apis/sushi";
import { FaPencilAlt } from "react-icons/fa"; //react-icons

/** 초밥집 리스트 페이지(sushiList) */
export function SushiListPage() {
  let navigate = useNavigate();
  const [sushiList, setSushiList] = useState([]);

  useEffect(() => {
    getSushiList().then((data) => setSushiList(data));
  }, []);

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-3xl">초밥 리스트</h1>

      <ul className="flex flex-col gap-4 p-4 shadow-lg">
        {sushiList.map((sushi, i) => (
          <li
            className="flex gap-4"
            key={sushi._id}
            onClick={() => {
              navigate(`/sushi-list/${sushi._id}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <span>{sushi.id}</span>
            <span>{sushi.name}</span>
            <span>{sushi.location}</span>
            <span>{sushi.phone}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

/** 초밥 상세 페이지(sushiList/id) */
export const Detail = () => {
  let { id } = useParams();
  const [sushi, setSushi] = useState();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0); // 평점(0 ~ 5)
  const [reviewText, setReviewText] = useState(""); //리뷰

  const fetchSushiDetail = (id) => {
    console.log('fetch ss')
    getSushi(id).then((data) => setSushi(data));
  };

  //평점과 리뷰를 추가
  const handleSubmitReview = (event) => {
    event.preventDefault();
    // reviewRating와 reviewText 변수를 사용하여 리뷰 정보를 서버에 전송
    let postData = {
      sushiId: id,
      contents: reviewText,
      star: reviewRating, // 0 ~ 5
    };
    postReview(postData)
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
              <input
                type="number"
                step="0.5"
                min="0"
                max="5"
                value={reviewRating}
                onChange={(e) => setReviewRating(parseFloat(e.target.value))}
              />
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
