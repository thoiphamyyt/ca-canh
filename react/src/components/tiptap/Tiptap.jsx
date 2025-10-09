"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List,
  ListOrdered,
  Code2,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Table as TableIcon,
  Columns,
  Rows,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Tiptap = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Table.configure({
        resizable: true, // cho phép resize cột
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border rounded-md p-2">
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
        <Button
          size="sm"
          variant={
            editor.isActive("heading", { level: 1 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant={editor.isActive("codeBlock") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <UndoIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <RedoIcon className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          <Columns className="w-4 h-4 rotate-180" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
        >
          <Columns className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().addRowBefore().run()}
        >
          <Rows className="w-4 h-4 rotate-180" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          <Rows className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().deleteTable().run()}
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            const url = window.prompt("Nhập URL ảnh:");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="ProseMirror min-h-[150px] px-2"
      />
    </div>
  );
};

export default Tiptap;
