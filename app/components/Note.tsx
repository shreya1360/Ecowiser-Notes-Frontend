import { useState } from 'react'
import { Leaf, Edit, Trash2 } from 'lucide-react'

interface NoteProps {
  _id: string;
  title: string;
  description: string;
  pinned: boolean;
  createdAt: string;
  onPin: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
  onDelete: (id: string) => void;
}

export default function Note({ _id, title, description, pinned, createdAt, onPin, onEdit, onDelete }: NoteProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const [editedDescription, setEditedDescription] = useState(description)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit(_id, editedTitle, editedDescription)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedTitle(title)
    setEditedDescription(description)
    setIsEditing(false)
  }

  return (
    <div 
      className={`bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200 relative ${
        pinned ? 'border-2 border-green-500' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isEditing ? (
        <>
          {(pinned || isHovered) && (
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                onClick={() => onPin(_id)}
                className={`p-1 rounded-full ${
                  pinned ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                }`}
                aria-label={pinned ? "Unpin note" : "Pin note"}
              >
                <Leaf className="w-4 h-4" />
              </button>
              <button
                onClick={handleEdit}
                className="p-1 rounded-full text-gray-400 hover:text-green-600"
                aria-label="Edit note"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(_id)}
                className="p-1 rounded-full text-gray-400 hover:text-red-600"
                aria-label="Delete note"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
          {title && <h3 className="text-lg font-semibold mb-2 text-gray-800">{title}</h3>}
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="text-xs text-gray-400">
            Created on {new Date(createdAt).toLocaleDateString()}
          </p>
        </>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full mb-2 text-lg font-semibold text-gray-800"
            aria-label="Edit note title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full min-h-[100px] mb-4 focus:outline-none  text-gray-600"
            aria-label="Edit note description"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

