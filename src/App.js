import "./App.css"
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemShow = 10;

  useEffect(() => {
    const handleResponse = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const apiData = await response.json();
        // console.log(apiData);
        setData(apiData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    handleResponse();
  }, []);

  const firstIndex = (currentPage - 1) * itemShow;
  const lastIndex = firstIndex + itemShow;
  const showData = data.slice(firstIndex, lastIndex);

  const totalPage = Math.ceil(data.length / itemShow);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const TableData = () => {
    return (
      <>
        {showData.map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <div className="container">
      <h1>Employee Data Table</h1>

      <div>
        {loading ? (
          <h1>Loading......</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <TableData />
            </tbody>
          </table>
        )}
        {error && " sorry! can not found the data"}
      </div>
      <div className="buttonWraper">
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
        <p>{currentPage}</p>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
