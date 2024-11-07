import {
  MdOutlineFileUpload,
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdDelete,
  MdDownload,
} from "react-icons/md";
import { Resizable } from "re-resizable";
import { useDispatch, useSelector } from "react-redux";
import {
  EditorHeader,
  EditorHeaderIconContainer,
  EditorWrapper,
  Button,
  HiddenEditorContainer,
  EditorHeaderText,
  CustomHandle,
} from "./styled";
import { setShowEditor } from "../../slices/editorTextSlice";
import { setError, setOpenInstructionsModal } from "../../slices/modalsSlice";
import { MonacoEditor } from "./Editor";
import { BsQuestionCircleFill } from "react-icons/bs";

export const TextEditor = ({ children, text, setText }) => {
  const dispatch = useDispatch();

  const isSimulating = useSelector((state) => state.application.isSimulating);

  const show = useSelector((state) => state.editorText.show);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const inputText = formatText(e.target.result);
        setText(inputText);
        event.target.value = null;
      };
      reader.onerror = () => {
        dispatch(setError("Error reading file."));
      };
      reader.readAsText(file);
    } else {
      dispatch(setError("Please select a valid .txt file."));
    }
  };

  const formatText = (enteredText) => {
    const lines = enteredText.split("\n");
    const areAllDirs = lines
      .map((line) => line.split(" ")[0])
      .every((line) => line.length == 2);
    if (areAllDirs) {
      return lines.map((line) => line.split(" ").slice(1).join(" ")).join("\n");
    } else {
      return enteredText;
    }
  };

  const handleClearText = () => {
    if (!isSimulating) {
      setText("");
    } else {
      // no se puede editar el codigo mientras se simula
    }
  };

  const handleFileDownload = () => {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "programa.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return show ? (
    <Resizable
      id="editorContainer"
      defaultSize={{ width: 300, height: "100%" }}
      minWidth={250}
      maxWidth={800}
      handleStyles={{
        right: { background: "red", width: "0px" },
      }}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      handleComponent={{
        right: <CustomHandle></CustomHandle>,
      }}
    >
      <EditorWrapper>
        <EditorHeader>
          <EditorHeaderText>{isSimulating ? "Simulando" : ""}</EditorHeaderText>
          <EditorHeaderIconContainer>
            {isSimulating ? (
              <Button
                title="Ayuda"
                onClick={() => dispatch(setOpenInstructionsModal(true))}
              >
                <BsQuestionCircleFill size={18} />
              </Button>
            ) : (
              <>
                <Button htmlFor="file-upload" title="Subir archivo">
                  <MdOutlineFileUpload size={20} />
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  style={{ display: "none" }}
                  accept=".txt"
                  onChange={handleFileUpload}
                  disabled={isSimulating}
                />
                <Button onClick={handleClearText} title="Borrar">
                  <MdDelete size={20} />
                </Button>
                <Button onClick={handleFileDownload} title="Descargar">
                  <MdDownload size={20} />
                </Button>
                <Button
                  title="Ayuda"
                  onClick={() => dispatch(setOpenInstructionsModal(true))}
                >
                  <BsQuestionCircleFill size={18} />
                </Button>
              </>
            )}
            <Button onClick={() => dispatch(setShowEditor(!show))}>
              <MdArrowBackIosNew size={15} />
            </Button>
          </EditorHeaderIconContainer>
        </EditorHeader>
        <MonacoEditor editorValue={text} setEditorValue={setText} />
        {children}
      </EditorWrapper>
    </Resizable>
  ) : (
    <EditorWrapper>
      <HiddenEditorContainer>
        <Button onClick={() => dispatch(setShowEditor(!show))}>
          <MdArrowForwardIos size={15} />
        </Button>
      </HiddenEditorContainer>
    </EditorWrapper>
  );
};
