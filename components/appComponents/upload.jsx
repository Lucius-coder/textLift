"use client";
import React, { useEffect, useRef, useState } from "react";
import ModalComponent from "./AlertDialog";

const FileUpload = () => {
  let fileInput = useRef();
  const entirePage = useRef();
  const HoverStyles = ["border-blue-400", "bg-gray-100"];
  const [filename, setFileName] = useState();
  const [filetype, setFileType] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [show, setShow] = useState(false);
  const [currentFileName, setCurrentFileName] = useState("");
const fileInputRef=useRef()
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileInput.current.classList.add(...HoverStyles);
  };

  const entirePageDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileInput.current.classList.remove(...HoverStyles);
  };
    async  function submitFile  (params)  {
      try{

      
      let submifFile= await fetch("/api/upload/file",{
        method:"POST",
        body:params
      })}catch(err){
        console.log(err)
      }
    }
  
    const processFile=async (files)=>{
      if (files[0].type === "application/pdf") {
        setFileName(files[0].name);
        setFileType(files[0].type);
        setFileSize((files[0].size / (1024 * 1024)).toFixed(2) + "MB");
    
    let data =new FormData();
    data.append("file",files[0]);
    submitFile(data)
    
      } else {
        setShow(true);
        setCurrentFileName(files[0].name);
      }
    }
    
    
  
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fileInput.current.classList.remove(...HoverStyles);

    const files = event.dataTransfer.files;
    console.log(files);
 processFile(files)
   
  };
  const chooseFiles=(e)=>{
   
const files=fileInputRef.current

  fileInputRef.current.click()
  files.addEventListener("change",(e)=>{
    processFile(e.target.files)
  })
  }

  return (
    <div
      className="p-6 rounded-lg max-w-lg mx-auto"
      ref={entirePage}
      onDragOver={entirePageDragOver}
    >
      <ModalComponent
        show={show}
        setShow={setShow}
        filename={currentFileName}
      />
      <h2 className="text-white text-lg font-semibold mb-4">Upload Files</h2>
      <div
        className="border border-dashed border-gray-600 rounded-[10px] p-7 mb-6"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop} ref={fileInput}
      >
        <div className="flex flex-col items-center">
          <div className="text-gray-400 text-2xl mb-2">+</div>
          <button className="text-red-400 mb-1" onClick={chooseFiles}>
            Drag & drop or click to choose a file
          </button>
          <p className="text-gray-600 text-sm">Max file size: 10 MB</p>
        </div>
      </div>
      <div>
        <input type="file" name="file" id="" accept=".pdf" ref={fileInputRef} className="hidden" />
      </div>
      <div className="bg-gray-100 rounded-[8px] p-4 mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-red-600 text-slate-50 rounded-lg p-4 mr-3"></div>
          <div>
            <p className="text-sm font-semibold">{filename}</p>
            <p className="text-gray-400 text-xs">
              {filetype} | {fileSize}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="text-gray-400 hover:text-gray-200"></button>
          <button className="text-gray-400 hover:text-red-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414L11.414 11l2.293 2.293a1 1 0 01-1.414 1.414L10 12.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 11 6.293 8.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
