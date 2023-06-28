import { useEffect } from "react";
import axios from "axios";
const ToDo = ({ token }) => {
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/todos", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res);
  };
  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);
  return <div></div>;
};

export default ToDo;
