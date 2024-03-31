import React, { useState, useRef, useEffect } from 'react';

const EditableField = ({ initialValue, onSave, className }: { initialValue: string | null, onSave: (newValue: string) => void, className?: string }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if( editedValue !== initialValue){
            onSave(editedValue);
        }
        setEditMode(false);
      }
    };

    if (editMode) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editMode, editedValue, initialValue, onSave]);



  return (
    <div className={`px-6 py-4 ${className}`} onClick={() => setEditMode(true)}>
      {editMode ? (
          <input
            ref={inputRef}
            type="text"
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className='shadow-md'
          />
      ) : (
        <div>
          {initialValue}
        </div>
      )}
    </div>
  );
};

export default EditableField;
