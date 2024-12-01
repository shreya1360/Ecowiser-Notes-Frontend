'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import NoteCreator from './components/NoteCreator'
import NoteGrid from './components/NoteGrid'
import { toast } from 'react-toastify'

interface Note {
  _id: string;
  title: string;
  description: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    try {
      const response = await fetch('https://ecowiser-notes-backend.onrender.com/api/notes')
      if (response.ok) {
        const data: Note[] = await response.json()
        
        setNotes(data)
      } else {
        console.error('Failed to fetch notes')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCreateNote = async (newNote: { title: string; description: string }): Promise<void> => {
    try {
      const response = await fetch('https://ecowiser-notes-backend.onrender.com/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      })
      if (response.ok) {
      
        const createdNote: Note = await response.json()
        toast.success('Note created successfully')
        setNotes(prevNotes => [createdNote, ...prevNotes])
      } else {
        console.error('Failed to create note:', response.statusText)
        toast.error('Failed to create note')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handlePinNote = async (id: string): Promise<void> => {
    const noteToUpdate = notes.find(note => note._id === id)
    if (noteToUpdate) {
      try {
        const response = await fetch(`https://ecowiser-notes-backend.onrender.com/api/notes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pinned: !noteToUpdate.pinned }),
        })
        if (response.ok) {
          const updatedNote = await response.json()
          toast.success(`Note ${updatedNote.pinned ? 'pinned' : 'unpinned'} successfully`)
          setNotes(prevNotes =>
            prevNotes.map(note =>
              note._id === id ? { ...note, pinned: !note.pinned } : note
            )
          )
        } else {
          console.error('Failed to pin note:', response.statusText)
          toast.error('Failed to pin note')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const handleEditNote = async (id: string, title: string, description: string): Promise<void> => {
    try {
      const response = await fetch(`https://ecowiser-notes-backend.onrender.com/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      })
      if (response.ok) {
       
 
        toast.success('Note updated successfully')
        fetchNotes()
      } else {
        toast.error('Failed to update note')
        console.error('Failed to update note:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDeleteNote = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`https://ecowiser-notes-backend.onrender.com/api/notes/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        toast.success('Note deleted successfully')
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id))
      } else {
        toast.error('Failed to delete note')
        console.error('Failed to delete note:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <NoteCreator onCreateNote={handleCreateNote} />
        <NoteGrid 
          notes={notes} 
          onPinNote={handlePinNote}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      </main>
    </div>
  )
}