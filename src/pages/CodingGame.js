import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";

import React, { useState, useEffect } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

export default function CodingGame() {
  return <div>Hi code editor</div>;
}
