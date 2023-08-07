import { useEffect, useState } from "react";
import { getSushiList } from "../apis/sushi";

export default function SushiListPage() {
  const [sushiList, setSushiList] = useState([]);

  useEffect(() => {
    getSushiList().then((data) => setSushiList(data))
  }, []);

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-3xl">초밥 리스트</h1>

      <ul className="flex flex-col gap-4 p-4 shadow-lg">
        {sushiList.map((sushi) => (
          <li className="flex gap-4">
            <span>{sushi.name}</span>
            <span>{sushi.location}</span>
            <span>{sushi.phone}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
