import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSushiList } from "../../apis/sushi";
import StarRating from "../../components/star-rating";

/** 초밥집 리스트 페이지(sushiList) */
export function SushiListPage() {
  let navigate = useNavigate();
  const [sushiList, setSushiList] = useState([]);

  useEffect(() => {
    getSushiList().then((data) => setSushiList(data));
  }, []);

  return (
    <main className="flex flex-col items-center p-4">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 shadow-lg bg-white">
        {sushiList.map((sushi, _) => (
          <li
            key={sushi._id}
            onClick={() => {
              navigate(`/sushi-list/${sushi._id}`);
            }}
            className="cursor-pointer transition-transform transform hover:scale-105"
          >
            <div className="shadow-lg p-4 rounded-lg bg-white flex flex-col gap-3 border border-gray-300">
              <h5 className="text-xl font-semibold text-blue-700">
                {sushi.name}
              </h5>
              <span className="text-gray-600">
                위치: {sushi.location}
              </span>
              <span className="text-gray-600">
                번호: {sushi.phone}
              </span>
              <div className="text-gray-600 flex gap-2 items-center">
                <div>별점: </div>
                <StarRating value={sushi.starsAvg} maxValue={5} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
