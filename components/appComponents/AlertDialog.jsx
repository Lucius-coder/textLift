"use client"
import React, { useRef, useEffect } from 'react';

const ModalComponent = ({ filename, show, setShow }) => {
  let hidden = useRef();
  

  const close = () => {
    hidden.current.classList.add("hidden");
    setShow(false); // Hide the modal by updating the show state
  };

  // This effect ensures the modal is displayed correctly when show is true
  useEffect(() => {
    if (show) {
      hidden.current.classList.remove("hidden");
    }
  }, [show]);

  return (
    <div ref={hidden} className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-[0.08px] ${(show) ? "" : "hidden"}`}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        
        {/* Header with icon and title */}
        <div className="flex items-center">
          <h2 className="text-xl font-semibold">{filename}</h2>
        </div>
        
        {/* Subtitle text */}
        <p className="text-gray-500 mt-2">
          {(filename.indexOf(".") !== -1) ? `${filename} cannot be opened since it is not a PDF file.` : "folders cannot be uploaded "}
          
        </p>
        
        {/* Buttons */}
        <div className="flex justify-end mt-6">
          <button className="bg-red-600 text-white rounded-xl px-4 py-2 hover:bg-red-800" onClick={close}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
