import React, { useState, useRef, useEffect } from 'react';

const EditableField = ({ initialValue, onSave}: { initialValue: string | null, onSave: (newValue: string) => void, className?: string }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue || "");
  const inputRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        if(editedValue !== initialValue){
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
    <td className="text-left border overflow-wrap break-all bg-white p-2" onClick={() => setEditMode(true)}>
      {editMode ? (
          <textarea
            ref={inputRef}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className='shadow-md w-full h-full focus:ring-0'
            rows={5}
          />
      ) : (
        <div>
          {initialValue}
        </div>
      )}
    </td>
  );
};

export default EditableField;
