// "use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Heading from "@tiptap/extension-heading";
import Image from "next/image";

interface TipTapProps {
  editorContent: string;
  onChange: (content: string) => void;
}

const Tiptap = ({ editorContent, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ListItem,
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold capitalize",
          levels: [2],
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-2",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-2",
        },
      }),
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col justify-stretch min-h-[200px] border rounded border-b-0">
      <div className="flex items-center gap-2">
        {/* Bold Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 pt-2 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
          title="Bold (Ctrl+B)"
        >
          <b>B</b>
        </button>

        {/* Italic Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 pt-2 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
          title="Italic (Ctrl+I)"
        >
          <i>I</i>
        </button>

        {/* Heading */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active pt-2" : "pt-2"
          }
        >
          <Image
            src="/heading2.svg"
            alt="Heading 2"
            width={10}
            height={10}
            className="h-4 w-4"
          />
        </button>
        {/* Heading */}

        {/* Bullet List Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 pt-2 rounded ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
          title="Bullet List"
        >
          <Image
            src="/bullet-list.svg"
            alt="Bullet list"
            width={10}
            height={10}
            className="h-4 w-4"
          />
        </button>

        {/* Ordered List Button */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 pt-2 rounded ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
          title="Ordered List"
        >
          <Image
            src="/numbered-list.svg"
            alt="Numberedlist"
            width={10}
            height={10}
            className="h-4 w-4"
          />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
