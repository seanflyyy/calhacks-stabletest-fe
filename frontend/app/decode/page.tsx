'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Arrow from '@/public/arrow.svg'
import ArrowWhite from '@/public/arrow-white.svg'
import { getImageFromApi } from '@/api/api';
import ImageContainer from '@/components/imageContainer';
import ImageContainerWithArrow from '@/components/imageContainerWithArrow'
import ImageContainerFirst from '@/components/imageContainerFirst'
import Navbar from '@/components/navbar'
import DecodeInformation from '@/components/decodeInformation'



// apiKey: "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",

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [watermarkImagePath, setWatermarkImagePath] = useState('')

  const [inputFieldText, setInputFieldText] = useState('');
  const [isGettingImage, setIsGettingImage] = useState(false)
  const [originalImagePath, setOriginalImagePath] = useState('');
  const [watermarkedImagePath, setWatermarkedImagePath] = useState('');
  const [watermarkImagePath, setWatermarkImagePath] = useState('');

  const [bitAccuracy, setBitAccuracy] = useState(0)
  const [decoded, setDecoded] = useState('')
  const [message, setMessage] = useState('')


  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);

  //   // Preview the selected image
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setPreviewUrl(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const decodeImage = async () => {
    await getWatermarkImage()
    await getOriginalImage()
    await getDecodingInformation()
  };

  const getDecodingInformation = async () => {
    const url = `http://localhost:3003/getDetails`
    await fetch(url) // Replace with the actual API route
    .then( async (response) => {
      if (response.ok) {
        const res = await response.json()
        
        setBitAccuracy(res.data.bit_accuracy)
        setDecoded(res.data.decoded)
        setMessage(res.data.message)

      }
      throw new Error('Network response was not ok');
    })
    .catch((error) => {
      console.error('Error fetching image:', error)
      return {
        result: '',
        status: 404
      }
  });
  }


  const getOriginalImage = async () => {
    const url = `http://localhost:3003/original`
    await getImageFromApi(url).then(async (response) => {
      if (response.status === 200) {
        setOriginalImagePath(response.result)
      } else {
        setOriginalImagePath('')
      }
    })
  }

  const getWatermarkedImage = async () => {
    setIsGettingImage(true)
    const url = "http://localhost:3003/watermarkedImage"
    await getImageFromApi(url).then((response => {
      if (response.status === 200) {
        setWatermarkedImagePath(response.result)
        setIsGettingImage(false)
      } else {
        setWatermarkedImagePath('')
      }
    }))
  }

  const getWatermarkImage = async () => {
    const url = "http://localhost:3003/watermarkImage"
    await getImageFromApi(url).then((response => {
      if (response.status === 200) {
        setWatermarkImagePath(response.result)
      } else {
        setWatermarkImagePath('')
      }
    }))
  }
  

  useEffect(() => {
    getWatermarkedImage()
  }, [])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.')
  }

  return (
    <div>
      <Navbar path='Decode'/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div>
          <div className='flex flex-row text-black justify-start mb-12'>
            <button onClick={decodeImage} className="relative cursor-pointer bg-transparent text-black rounded-md p-2 w-36 border-solid border-2 border-black justify-center items-center flex hover:bg-black hover:text-white">
              Decode
            </button>
          </div>
          {/* <ImageContainerFirst 
            title={"Recently Generated Imaged"}
            imagePath={""}
          /> */}
          <div className="flex flex-row">
             <ImageContainerFirst 
              title={"Recently Generated Watermarked Image"}
              imagePath={watermarkedImagePath}
              isGettingImage={isGettingImage}
            />
            <ImageContainerWithArrow 
              title={"Watermark"}
              imagePath={watermarkImagePath}
            />
            {/* <ImageContainerWithArrow 
              title={"Image Without Watermark"}
              imagePath={originalImagePath}
            /> */}
            <DecodeInformation 
              title={"Decode Information"}
              imagePath={originalImagePath}
              bitAccuracy={bitAccuracy}
              message={message}
              decoded={decoded}
            />
          </div>
      </div>
      </div>
    </div>
  )
}
