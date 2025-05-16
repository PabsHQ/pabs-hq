/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default function Toolbar({ editor }: { editor: any }) {
  if (!editor) return null

  const apply = (command: any) => () => editor.chain().focus()[command]().run()

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50 flex flex-wrap">
      <button onClick={apply('toggleBold')} className={editor.isActive('bold') ? 'btn-active' : 'btn'}>Bold</button>
      <button onClick={apply('toggleItalic')} className={editor.isActive('italic') ? 'btn-active' : 'btn'}>Italic</button>
      <button onClick={apply('toggleUnderline')} className={editor.isActive('underline') ? 'btn-active' : 'btn'}>Underline</button>
      <button onClick={apply('toggleStrike')} className={editor.isActive('strike') ? 'btn-active' : 'btn'}>Strike</button>

      {[1, 2, 3].map((level) => (
        <button
          key={level}
          onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          className={editor.isActive('heading', { level }) ? 'btn-active' : 'btn'}
        >
          H{level}
        </button>
      ))}

      <button onClick={apply('toggleBlockquote')} className={editor.isActive('blockquote') ? 'btn-active' : 'btn'}>Blockquote</button>
      <button onClick={apply('toggleCode')} className={editor.isActive('code') ? 'btn-active' : 'btn'}>Inline Code</button>
      <button onClick={apply('toggleCodeBlock')} className={editor.isActive('codeBlock') ? 'btn-active' : 'btn'}>Code Block</button>

      <button onClick={apply('toggleBulletList')} className={editor.isActive('bulletList') ? 'btn-active' : 'btn'}>• List</button>
      <button onClick={apply('toggleOrderedList')} className={editor.isActive('orderedList') ? 'btn-active' : 'btn'}>1. List</button>

      <button onClick={apply('undo')} className="btn">↺ Undo</button>
      <button onClick={apply('redo')} className="btn">↻ Redo</button>

      <button onClick={apply('setHorizontalRule')} className="btn">HR</button>

      <button
        onClick={() => {
          const url = prompt('Enter URL:')
          if (url) editor.chain().focus().setLink({ href: url }).run()
        }}
        className={editor.isActive('link') ? 'btn-active' : 'btn'}
      >
        Link
      </button>

      <button
        onClick={() => {
          const url = prompt('Enter image URL:')
          if (url) editor.chain().focus().setImage({ src: url }).run()
        }}
        className="btn"
      >
        Image
      </button>
    </div>
  )
}
