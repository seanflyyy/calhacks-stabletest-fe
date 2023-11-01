'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Arrow from '@/public/arrow.svg'
import ArrowWhite from '@/public/arrow-white.svg'
import { getImageFromApi } from '../api/api';
import ImageContainer from '@/components/imageContainer';
import ImageContainerWithArrow from '@/components/imageContainerWithArrow'
import ImageContainerFirst from '@/components/imageContainerFirst'
import Navbar from '@/components/navbar'



// apiKey: "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",

export default function Home() {
  const [inputFieldText, setInputFieldText] = useState('');
  const [isGettingImage, setIsGettingImage] = useState(false)
  const [originalImagePath, setOriginalImagePath] = useState('');
  const [watermarkedImagePath, setWatermarkedImagePath] = useState('');
  const [watermarkImagePath, setWatermarkImagePath] = useState('');


  // const onEnter = async () => {
  //   const text = await post_openai(/* Pass the appropriate request data here */);
  //   setResponseText(text);
  // };

  const getOriginalImage = async (message: string) => {
    setIsGettingImage(true)
    const url = `http://localhost:3003/originalImage?message=${message}`
    await getImageFromApi(url).then(async (response) => {
      if (response.status === 200) {
        setOriginalImagePath(response.result)
        setIsGettingImage(false)
        await getWatermarkedImage()
        await getWatermarkImage()
      } else {
        setOriginalImagePath('')
      }
    })
  }

  const getWatermarkedImage = async () => {
    const url = "http://localhost:3003/watermarkedImage"
    await getImageFromApi(url).then((response => {
      if (response.status === 200) {
        setTimeout(() => setWatermarkedImagePath(response.result), 1000)
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
  
  return (
    <div>
      <Navbar path='Encode'/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        
        <div>
          <div className="flex">
            <ImageContainerFirst 
              title={"Original Image"}
              imagePath={originalImagePath}
              isGettingImage={isGettingImage}
            />
            <ImageContainerWithArrow 
              title={"Watermark"}
              imagePath={watermarkImagePath}
            />
            <ImageContainerWithArrow 
              title={"Watermarked Image"}
              imagePath={watermarkedImagePath}
            />
          </div>
          <input
              className="h-12 px-4 py-2 border rounded-lg bg-gray-200 focus:outline-none focus:ring focus:border-blue-500 text-black mt-20 w-full"
              type="text"
              value={inputFieldText}
              placeholder="Text Field"
              onChange={(event) => {
                setInputFieldText(event.target.value)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setInputFieldText('')
                  setOriginalImagePath('')
                  setWatermarkImagePath('')
                  setWatermarkedImagePath('')
                  getOriginalImage(inputFieldText);
                  event.preventDefault(); // Prevent the default form submission behavior
                }
              }}
            />
          </div>
      </div>
    </div>
  )
}
