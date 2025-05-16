// src/Tiptap.tsx
import {
  useEditor,
  EditorContent
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import HardBreak from "@tiptap/extension-hard-break";
import History from "@tiptap/extension-history";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Toolbar from "./toolbar";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const Tiptap = ({
  content,
  onChange,
}: RichTextEditorProps)  => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      Heading.configure({ levels: [1, 2, 3] }),
      Blockquote,
      Code,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      HardBreak,
      History,
      HorizontalRule,
      Link.configure({
        openOnClick: true,
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: content, 
    editorProps: {
      attributes: {
        class: "min-h-[250px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default Tiptap;
