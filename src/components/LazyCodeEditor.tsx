import React, { lazy, Suspense } from "react";
import { Loader } from "semantic-ui-react";
import { loader as monacoLoader } from "@monaco-editor/react";
import type { CodeEditorProps } from "./CodeEditor";

import style from "./CodeEditor.module.less";

const CodeEditor = lazy(async () => {
  // Use local monaco-editor package installed via npm
  // The @monaco-editor/react loader will automatically find it
  const monaco = await monacoLoader.init();
  window["Monaco"] = monaco;
  return import("./CodeEditor");
});

const LazyCodeEditor: React.FC<CodeEditorProps> = props => {
  const loading = (
    <div className={props.className ? `${style.editorContainer} ${props.className}` : style.editorContainer}>
      <Loader className="workaround" active />
    </div>
  );
  return (
    <Suspense fallback={loading}>
      <CodeEditor {...props} />
    </Suspense>
  );
};

export default LazyCodeEditor;
