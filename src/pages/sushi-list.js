import { useEffect, useState } from "react";
import axios from "axios";

export default function SushiListPage() {
  const [sushiList, setSushiList] = useState([]);

  useEffect(() => {
    axios.get("http://146.56.180.210:3200/sushi").then((response) => {
      setSushiList(response.data);
    });
  }, []);

  return (
    <main>
      <h1 className="text-xl">초밥 리스트</h1>
      <ul>  
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
