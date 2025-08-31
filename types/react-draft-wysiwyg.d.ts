declare module "react-draft-wysiwyg" {
  import * as React from "react"
  import { EditorState, ContentState, RawDraftContentState } from "draft-js"

  export interface EditorProps {
    editorState: EditorState
    onEditorStateChange: (editorState: EditorState) => void
    toolbar?: object
    wrapperClassName?: string
    editorClassName?: string
    toolbarClassName?: string
    localization?: { locale: string }
    readOnly?: boolean
    placeholder?: string
    stripPastedStyles?: boolean
    [key: string]: any
  }

  export class Editor extends React.Component<EditorProps> {}
}
