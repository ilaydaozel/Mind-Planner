"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import Modal from 'react-modal';
import Button from '../formComponents/Button';
import { handleApiResponse } from '@/app/utils/Helper';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import InputField from '../formComponents/InputField';

Modal.setAppElement('#programsPage');

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
    additionalNotes: '',
    applicationStatus: '',
    ranking: 0,
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
    <Modal isOpen={isOpen} onRequestClose={onClose} className="w-fit fixed overflow-y-auto overflow-x-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-solid border-gray-200 rounded-lg shadow-md p-6">
      <div className='flex flex-col items-center p-4'>
        <h2 className='text-lg font-bold mb-4'>Add New Program</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className='flex gap-4'>
            <div className='flex flex-col gap-4'>
              <InputField 
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField 
                label="University Name"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
              />
              <InputField 
                label="Program Link"
                name="programLink"
                value={formData.programLink}
                onChange={handleChange}
              />
              <InputField 
                label="Course Content"
                name="courseContent"
                value={formData.courseContent}
                onChange={handleChange}
              />
              <InputField 
                label="Rank"
                name="rank"
                value={formData.ranking}
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-4'>
              <InputField 
                label="Requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
              />
              <InputField 
                label="Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              />
              <InputField 
                label="Application Deadline"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
              />
              <InputField 
                label="Additional Notes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
              />
              <InputField 
                label="Status"
                name="status"
                value={formData.applicationStatus}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex gap-4 items-center justify-end'>
            <Button type="submit" label='Add Program'/>
            <Button type="button" onClick={onClose} label='Cancel'/>
          </div>
        </form>
      </div>

    </Modal>
  );
};

export default AddProgramForm;