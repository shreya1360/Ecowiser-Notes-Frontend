import { useState, FormEvent } from 'react'
import { Plus, Leaf } from 'lucide-react'

interface NoteCreatorProps {
  onCreateNote: (newNote: { title: string; description: string; pinned: boolean }) => void;
}

export default function NoteCreator({ onCreateNote }: NoteCreatorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isPinned, setIsPinned] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return
    const newNote = {
      title: title.trim(),
      description: description.trim(),
      pinned: isPinned,
    }
    onCreateNote(newNote)
    setTitle('')
    setDescription('')
    setIsPinned(false)
    setIsExpanded(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8 transition-all duration-300 ease-in-out">
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 text-lg font-semibold focus:outline-none  rounded p-2 text-gray-800"
            aria-label="Note title"
          />
        )}
        <textarea
          placeholder="Take a note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onClick={() => setIsExpanded(true)}
          className="w-full min-h-[50px] focus:outline-none  rounded p-2 resize-none text-gray-800 "
          rows={isExpanded ? 3 : 1}
          aria-label="Note description"
        />
        {isExpanded && (
          <div className="flex justify-between items-center mt-2">
            <button
              type="button"
              onClick={() => setIsPinned(!isPinned)}
              className={`p-2 rounded-full ${
                isPinned ? 'text-green-600 bg-green-100' : 'text-gray-400 hover:text-green-600 hover:bg-green-100'
              } transition-colors duration-200`}
              aria-label={isPinned ? "Unpin note" : "Pin note"}
            >
              <Leaf className="w-5 h-5" />
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-700"
              aria-label="Add note"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Note
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

