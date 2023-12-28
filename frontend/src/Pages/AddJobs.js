import React from "react";
import JobPoster from "../Components/JobPoster";
import JobFields from "../Components/JobFields";
export default function () {
  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ display: "flex" }}>
          <div className="col-md-7">
            <JobFields />
          </div>
          <div className="col-md-5">
            <JobPoster />
          </div>
        </div>
      </div>
    </>
  );
}
