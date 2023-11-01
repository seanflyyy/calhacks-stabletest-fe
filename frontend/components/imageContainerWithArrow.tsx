import Image from "next/image"
import ImageContainer from "./imageContainer"
import Arrow from '@/public/arrow.svg'

const ImageContainerWithArrow = ({title, imagePath}: {
  title: string;
  imagePath: string;
}) => {
  return (
    <div className={`flex-row flex transition-all duration-1000 ${!imagePath ? "opacity-0" : "opacity-100"}`}>
        <Image src={Arrow} alt="Arrow" width={100} height={100}/>
        <ImageContainer 
          title={title}
          imagePath={imagePath}
        />
    </div>
  )
}

export default ImageContainerWithArrow