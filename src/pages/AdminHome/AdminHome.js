import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";

const AdminHome = () => {
  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="float-right">
          <Link to="/new-quiz">
            <button className="btn btn-primary">Create New Quiz</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
