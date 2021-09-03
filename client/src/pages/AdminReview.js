import React from "react";
import { Link } from "react-router-dom";
import { GetReviews, UpdateReview } from "../ExpressAPI.js";

export default function AdminReview() {
  const { data } = GetReviews();

  const doApprove = (id) => {
    UpdateReview(id, "approve").then((json) => {
      window.location.reload(false);
    });
  };

  const doDelete = (id) => {
    UpdateReview(id, "delete").then((json) => {
      window.location.reload(false);
    });
  };

  const getAdminReviews = (data) => {
    let content = [];
    if (data !== null) {
      if (data.Response === "False") {
        content.push(
          <div key="98" className="error">
            {data.Error}
          </div>
        );
      } else if (data === "") {
        content.push(
          <div key="99" className="message">
            No reviews for approval.
          </div>
        );
      } else {
        for (let item of data) {
          content.push(
            <div key={item.id}>
              <section>
                <p>
                  Date:
                  {new Date(item.reviewed).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                <p>{item.reviewer}</p>
                <p>Rating: {item.rating}</p>
                <p>Comment: {item.comment}</p>
              </section>
              <div className="buttons-icons">
                <button
                  onClick={() => {
                    doApprove(item.id);
                  }}
                >
                  <img src="tick.png" alt="confirm ico" />
                </button>&nbsp;&nbsp;&nbsp;
                <button
                  onClick={() => {
                    doDelete(item.id);
                  }}
                >
                  <img src="letter-x.png" alt="decline ico" />
                </button>
              </div>
            </div>
          );
        }
      }
    }

    return content;
  };

  return (
    <div>
      <img src="Logo.png" alt="sslogo" className="logo logo-dark" />
      <Link to="/">
        <button className="button-medium" title="SearchPage">
          <img src="home.png" alt="Home page button" />
        </button>
      </Link>
      <div className="reviews-admin">{getAdminReviews(data)}</div>
    </div>
  );
}
