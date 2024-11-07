// import React from "react";
import { useState, useEffect } from "react";
import { TextEditor } from "../../components/TextEditor";
import { TextEditorButtons } from "../../components/TextEditor/TextEditorButtons";

export const EditorSection = () => {
  const [text, setText] = useState("");
  return (
    <TextEditor text={text} setText={setText}>
      <TextEditorButtons text={text} />
    </TextEditor>
  );
};
