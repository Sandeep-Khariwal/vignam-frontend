import React, { useEffect, useRef, useState } from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { useDisclosure } from '@mantine/hooks'
import axios from "axios"
import { Button, Modal } from 'antd';
import { Textarea } from '@mantine/core';
import { FileInput } from '@mantine/core';
import toast, { Toaster } from 'react-hot-toast';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
import { pdfjs } from 'react-pdf';

const URL = process.env.URL || "https://vignam-backend-p6l3.onrender.com"

type PdfItem = {
  file: File;
  preview: string;
  name: string;
};

const Teach = () => {
  const [textContent,setTextContent] = useState<string[]>([])
  const [addText,setAddText] = useState<string>("")
  const [pdfContent,setPdfContent] = useState<PdfItem[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputModalOpen, setIsInputModalOpen] = useState(false);
  const [value, setValue] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfItems, setPdfItems] = useState<PdfItem[]>([]);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);

  useEffect(()=>{
    getAllContent()
   },[])
   const getAllContent = async()=>{
     const data= await axios.get(`${URL}/getContent`).then((response)=>response.data)
     
     if(data.success){
       setTextContent(data?.textArray?.textContent)
     }
   }

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showInputModal = () => {
    setIsInputModalOpen(true);
  };
  const handleInputCancel = () => {
    setIsInputModalOpen(false);
  };


  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async(event: any) => {
    const file = event.target.files?.[0];

    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      const pdfPreview = await generatePdfPreview(file);
      setPdfItems((prevItems) => [...prevItems, { file, preview: pdfPreview, name: file.name }]);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const generatePdfPreview = async (file: File): Promise<string> => {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        try {
          const typedarray = new Uint8Array(fileReader.result as ArrayBuffer);
          const pdf: PDFDocumentProxy = await getDocument(typedarray).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement('canvas');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const context = canvas.getContext('2d')!;
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          };

          await page.render(renderContext).promise;
          resolve(canvas.toDataURL());
        } catch (error) {
          reject(error);
        }
      };
      fileReader.readAsArrayBuffer(file);
    });
  };

  const handleAddContent = async() =>{
    if(!addText && !pdfFile){
       toast.error("Plese select Content")
       return
    }
      setPdfContent(pdfItems)
    
    if(pdfFile){
      toast.success("File Added")
    }
    if(addText){
      const data= await axios.post(`${URL}/addContent`,{textContent:addText}).then((response)=>response.data)
      if(data.success){
        toast.success(data.message)
        setTextContent(data.textArray.textContent)
      }
    }

    setPdfFile(null);
    setAddText("")
    setIsModalOpen(false)
  }

  return (<>
      <Toaster />
        <div className='w-full h-full flex flex-col pt-5 items-center ' >
        <div className='w-[95%] flex justify-start items-center  border-b-2 border-b-gray-300 pb-3 ' >
          <FaChevronLeft className='text-gray-500 mr-2' />
          <h3>Chapter Name</h3>
        </div>

        <div className='w-full mx-auto flex justify-center items-center py-5 ' >
          <div className='border-2 border-gray-500 rounded-lg w-[70%] h-[10rem] flex ' >
            <h1 className='m-auto' >Simulation content </h1>
          </div>
        </div>

        <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={400}
        footer={null}
      >
        <div className='w-full flex pt-10 justify-around items-center ' >
          <div onClick={()=>setIsInputModalOpen(true)} className='w-[40%] h-[10rem] px-1 mt-1 border-2 border-gray-500 rounded-lg flex flex-col justify-center items-center cursor-pointer ' >
          { !addText ?
          <>
          <img src='/assets/teach/Text.svg' alt='Not Found' width={30} height={30} />
           <p className='text-center text-sm ' >Type your own personalized content</p>
          </> :
          <p className='text-center text-sm ' >{addText}</p>
          }
          </div>
          
          <div  onClick={handleBoxClick} className='w-[40%] h-[10rem]  px-1 mt-1 border-2 border-gray-500 rounded-lg flex flex-col justify-center items-center cursor-pointer' >
           <img src='/assets/teach/pdf.svg' alt='Not Found' width={30} height={30} />
           <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />  
           <p className='text-center text-sm ' >Upload a pdf of your content</p>
           <FileInput value={pdfFile} onChange={setPdfFile} />
          </div>
        </div>
        <div className='w-full py-4 flex justify-end items-center ' >
        <Button onClick={() => setIsModalOpen(false)} className='w-4rem h-1rem mt-3 mr-3  rounded-lg  ' >Cancel</Button>
        <Button onClick={handleAddContent} className='w-4rem h-1rem mt-3 bg-blue-600 rounded-lg text-white ' >Add content</Button>
        </div>
      </Modal>

        <Modal
        open={isInputModalOpen}
        onCancel={() => setIsInputModalOpen(false)}
        width={400}
        footer={null}>
          <div className='w-full mt-8 flex flex-col justify-center items-center ' >
          <textarea
            placeholder="Enter Text..."
            // autosize
            onChange={(e)=>setAddText(e.target.value)}
            minRows={2}
            maxRows={4}
            style={{width:"100%"}}
            className='border-2 border-gray-600 rounded-lg '
          />
          <Button onClick={handleInputCancel} className='w-4rem h-1rem mt-3 bg-blue-600 rounded-lg text-white ' >Add content</Button>
          </div>
      </Modal>

      {(!textContent || !pdfContent) && <div className='w-full flex flex-col justify-center items-center py-5 '>
          <div className=' bg-blue-50 p-7 rounded-full ' > 
            <img src='/assets/teach/addFile.svg' alt='No' width={50} height={50} className='' />
          </div>
          <p className='my-2'>Content not adedd yet</p>
          <Button onClick={showModal} className='w-4rem h-1rem  mt-1 bg-blue-600 rounded-lg text-white ' >Add content</Button>
      </div>}

      <div className='w-[95%]  '>
        <div className='py-5 flex overflow-x-scroll ' >
        {pdfContent.map((item, index) => (
        <div key={index} className=" flex flex-col items-center flex-wrap ">
         <div className='w-[8rem] bg-gray-200 mr-2 rounded-lg' >
         <div className='px-2 '><img src={item.preview} alt={`PDF Preview ${index}`}  className=" mt-2" /></div>
            <div className="w-full h-[2rem] flex items-center bg-white  ">
              <img src="/assets/teach/pdfIcon.svg" alt="PDF Icon" width={20} height={20} />
              <p className="ml-2 text-center text-sm">{item.name}</p>
            </div>
         </div>
          </div>
        ))}
        </div>
      
      {(textContent && pdfContent) &&  <Button onClick={showModal} className='w-4rem h-1rem my-3 m-3 rounded-lg border border-black ' >+ Add content</Button>}
        <div className='pt-3 pb-8' >
          {
            textContent && textContent.map((item,i)=>(
              <div key={i} >
                <p >{item}</p><br/>
              </div>
            ))
          }
        </div>
      </div>

    </div>
  </>)
}

export default Teach
