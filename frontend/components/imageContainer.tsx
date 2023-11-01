import Image from "next/image";
import React from 'react';

const ImageContainer = ({title, imagePath, backgroundColor = 'bg-purple', isShowImage = false}: {
  title: string
  imagePath: string
  backgroundColor?: string
  isShowImage?: boolean
}) => {
  return (
    <div>
      {imagePath
        ? (<h1 className={`text-black mb-6 font-bold`}>
          {title}
        </h1>)
        : isShowImage
        ? (<h1 className="text-black mb-6 font-bold">
        {title}
      </h1>)
        :  (<h1 className="text-white mb-6 font-bold">
            {title}
          </h1>)
      }
      <div>
        {          
          imagePath
          ? <Image className={`w-80 h-80 rounded-xl text-white transition-all duration-1000 ${!imagePath ? "opacity-0" : "opacity-100"}}`} alt={title} src={imagePath} width={80} height={80}/>
          : <div className={`w-80 h-80 p-8 rounded-xl text-white ${backgroundColor}`}></div>
        }
      </div>
  </div>
  )
}

export default ImageContainer;