import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSushiList } from "../../apis/sushi";

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
