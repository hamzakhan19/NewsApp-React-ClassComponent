import React, { Component } from "react";
import noImage from "../noimage.png";

export default class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, url, author, publishedAt, source } =
      this.props;
    return (
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imageUrl ? imageUrl : noImage}
          className="card-img-top"
          alt="..."
        />

        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {author ? author : "Unknown"} published at{" "}
              {new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a
            href={url}
            rel="noreferrer"
            target="_blank"
            className="btn btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}
