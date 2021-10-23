import { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import styled from "styled-components";

const TEXT_EDITOR_ITEM = "draft-js-item";

const MainTextArea = (props) => {
  const { minHight } = props;
  const data = localStorage.getItem(TEXT_EDITOR_ITEM);

  const initialState = data
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    : EditorState.createEmpty();

  const [editorState, setEditorState] = useState(initialState);

  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem(TEXT_EDITOR_ITEM, data);
  };
  const handleKeyCommand = (DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(
      editorState,
      DraftEditorCommand
    );
    if (newState) {
      setEditorState(newState);
      return "handle";
    }
    return "not-handled";
  };
  const handleToggleClick = (e, inlineStyle) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e, blockType) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const BLOCK_TYPES = [
    { label: "H1", style: "header-one" },
    { label: "H2", style: "header-two" },
    { label: "H3", style: "header-three" },
    { label: "H4", style: "header-four" },
    { label: "H5", style: "header-five" },
    { label: "H6", style: "header-six" },
    { label: "UL", style: "unordered-list-item" },
    { label: "OL", style: "ordered-list-item" },
  ];

  const INLINE_STYLES = [
    { label: "Bold", style: "BOLD" },
    { label: "Italic", style: "ITALIC" },
    { label: "Underline", style: "UNDERLINE" },
    { label: "strikthrough", style: "STRIKETHROUGH" },
    { label: "Monospace", style: "CODE" },
  ];

  return (
    <>
      <StyleBaseEditor>
        {/* ブロックタイプのボタン作成 */}
        {BLOCK_TYPES.map((type) => (
          <StyleLabelBtn
            onMouseDown={(e) => handleBlockClick(e, type.style)}
            key={type.label}
          >
            {type.label}
          </StyleLabelBtn>
        ))}
        <br />
        {/* インライン要素のボタン作成 */}
        {INLINE_STYLES.map((type) => (
          <StyleLabelBtn
            onMouseDown={(e) => handleToggleClick(e, type.style)}
            key={type.label}
          >
            {type.label}
          </StyleLabelBtn>
        ))}
        <StyleLabelBtn
          disable={editorState.getUndoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.undo(editorState))}
        >
          undo
        </StyleLabelBtn>
        <StyleLabelBtn
          disable={editorState.getRedoStack().size <= 0}
          onMouseDown={() => setEditorState(EditorState.redo(editorState))}
        >
          redo
        </StyleLabelBtn>
      </StyleBaseEditor>
      <StyleTextArea style={{ minHeight: minHight }}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
        />
      </StyleTextArea>
    </>
  );
};

const StyleLabelBtn = styled.button`
  color: #999;
  cursor: pointer;
  margin-right: 16px;
  padding: 2px 0;
  display: inline-block;
  border: none;
  background-color: white;
  &:hover {
    color: #5890ff;
    &:active {
      color: blue;
    }
  }
`;

const StyleTextArea = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  font-family: "Georgia", serif;
  font-size: 18px;
  padding: 15px;
  min-height: 10px;
`;

const StyleBaseEditor = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  font-family: "Georgia", serif;
  font-size: 14px;
  padding: 15px;
`;

export default MainTextArea;
