import React from "react"

export default function PremierFounder(props) {
  return (
    <div style={{ margin: "5px" }}>
      <h2 style={{ fontSize: 25, textAlign: "center" }}>{props.name}</h2>
      <img
        style={{
          width: "100%",
        }}
        src={props.imageUrl}
        alt={props.name}
      />
      <p style={{ fontSize: 20, textAlign: "center" }}>{props.description}</p>
    </div>
  )
}
