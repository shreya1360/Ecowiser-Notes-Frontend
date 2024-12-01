import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Note from './Note'

interface Note {
  _id: string;
  title: string;
  description: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface NoteGridProps {
  notes: Note[];
  onPinNote: (id: string) => void;
  onEditNote: (id: string, title: string, description: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function NoteGrid({ notes, onPinNote, onEditNote, onDeleteNote }: NoteGridProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  
  const sortedNotes = [...notes].sort((a, b) => (a.pinned === b.pinned) ? 0 : a.pinned ? -1 : 1)

 
  const indexOfLastNote = currentPage * itemsPerPage
  const indexOfFirstNote = indexOfLastNote - itemsPerPage
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote)

  
  const totalPages = Math.ceil(sortedNotes.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 border-b-2 pb-2">Notes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentNotes.map((note: Note) => (
          <Note 
            key={note._id} 
            {...note} 
            onPin={onPinNote}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

