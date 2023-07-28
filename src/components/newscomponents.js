import React from 'react'
import im from './not.jpg'
export default function newscomponents(props) {
  return (
    <div className="card" >
      <img src={props.imageurl ? props.imageurl : im} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.description}</p>
        <p className="card-text"><small className="text-body-secondary">Published By: {props.author ? props.author : "UNKNOWN"} on {new Date(props.publishedAt).toGMTString()} </small></p>
        <a href={props.url} className="btn btn-dark">Read More</a>
      </div>
    </div>
  )
}
