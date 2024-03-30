"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from '../buttons/Button';
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';

Modal.setAppElement('#root');

interface AddProgramFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProgramForm = ({ isOpen, onClose }: AddProgramFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    universityName: '' ,
    universityCity: '',
    programLink: '',
    courseContent: '',
    requirements: '',
    language: '',
    applicationDeadline: '',
    applicationDocuments: '',
    additionalNotes: [],
  });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        await handleApiResponse(
                axios.post(
                `/api/program/createProgram`, formData),
                router,
                "Add successful"
            );
        onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding program:', error);
      const errorMessage = (error as Error).message; // Cast 'error' to 'Error' type
      alert('An error occurred while adding the program: ' + errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2 className='text-text1-800 text-md'>Add New Program</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
            <label>
            Name:
            <input required type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
            University Name:
            <input required type="text" name="universityName" value={formData.universityName} onChange={handleChange} />
            </label>
            <label>
            University City:
            <input required type="text" name="universityCity" value={formData.universityCity} onChange={handleChange} />
            </label>
            <label>
            Program Link:
            <input type="text" name="programLink" value={formData.programLink} onChange={handleChange} />
            </label>
            <label>
            Course Content:
            <textarea name="courseContent" value={formData.courseContent} onChange={handleChange} />
            </label>
            <label>
            Requirements:
            <textarea name="requirements" value={formData.requirements} onChange={handleChange} />
            </label>
            <label>
            Language:
            <input type="text" name="language" value={formData.language} onChange={handleChange} />
            </label>
            <label>
            Application Deadline:
            <input type="text" name="applicationDeadline" value={formData.applicationDeadline} onChange={handleChange} />
            </label>
            <label>
            Application Documents:
            <input type="text" name="applicationDocuments" value={formData.applicationDocuments} onChange={handleChange} />
            </label>
            <label>
            Additional Notes:
            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} />
            </label>
        </div>
        
        <div className='flex gap-4'>
        <Button type="submit" label='Add Program'/>
        <Button type="button" onClick={onClose} label='Cancel'/>
        </div>

      </form>
    </Modal>
  );
};

export default AddProgramForm;
