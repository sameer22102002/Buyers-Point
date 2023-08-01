import React, { useState, useEffect } from "react";
import "./complains.css";
import { userRequest } from "../../requestMethods";

const Complains = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await userRequest.get("/complaint");
        setQueries(response.data);
      } catch (error) {
        console.error("Error fetching queries:", error);
      }
    };
    fetchQueries();
  }, []);

  const handleSolvedClick = async (_id) => {
    try {
      await userRequest.delete(`/complaint/${_id}`);

      setQueries((prevQueries) =>
        prevQueries.filter((query) => query._id !== _id)
      );
    } catch (error) {
      console.error("Error solving complaint:", error);
      alert("Failed to mark the complaint as solved. Please try again later.");
    }
  };

  return (
    <div className="Complains">
      <div className="Container">
        <h1>Customer Queries</h1>
        {queries.length === 0 ? (
          <p className="EmptyMessage">No queries to display</p>
        ) : (
          queries.map((query) => (
            <div className="QueryItem" key={query._id}>
              <div className="Unique">
                <p className="Title">{query.pid}</p>
                <p className="Email">Email: {query.email}</p>
                <p className="Message">Name : {query.name}</p>
                <p className="Message">Problem : {query.message}</p>
              </div>
              <div className="ButtonContainer">
                <button onClick={() => handleSolvedClick(query._id)}>
                  Solved
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Complains;
