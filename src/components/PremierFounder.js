import React from "react";

export default function PremierFounder(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <p>{props.description}</p>
      <img style={{ width: "100%" }} src={props.imageUrl} alt={props.name} />
    </div>
  );
}
