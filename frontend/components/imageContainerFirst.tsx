import Image from "next/image";
import React from 'react';
import Loading from "./loading";
import LoadingSpinner from "./loader/LoadingSpinner";

const ImageContainerFirst = ({title, imagePath, backgroundColor = 'bg-purple', isShowImage = false, isGettingImage = false}: {
  title: string
  imagePath: string
  backgroundColor?: string
  isShowImage?: boolean
  isGettingImage?: boolean
}) => {
  return (
    <div>
      <h1 className={`text-black mb-6 font-bold`}>
          {title}
      </h1>
      
      <Image className={`absolute rounded-xl w-80 h-80 text-white transition-all duration-1000 ${!imagePath ? "opacity-0" : "opacity-100"}}`} alt={title} src={imagePath} width={200} height={200}/>
      <div className={`relative bg-black w-80 h-80 rounded-xl transition-all duration-1000 ${!imagePath ? "opacity-100" : "opacity-0"}`}>
        {/* {isGettingImage && <Loading />} */}
        {isGettingImage && <LoadingSpinner />}
      </div>
    </div>
  )
}

export default ImageContainerFirst;