import Image from "next/image"
import ImageContainer from "./imageContainer"
import Arrow from '@/public/arrow.svg'

const DecodeInformation = ({title, imagePath, bitAccuracy, decoded, message, isShowImage=false}: {
  title: string;
  imagePath: string;
  bitAccuracy: number;
  decoded: string;
  message: string
  isShowImage?: boolean;
}) => {
  return (
    <div className={`ml-20 flex-row flex transition-all duration-1000 ${!imagePath ? "opacity-0" : "opacity-100"}`}>
        <div>
        {decoded && message && bitAccuracy
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
            decoded && message && bitAccuracy
            ? <div className={`w-92 h-80 rounded-xl text-black border-solid border-2 p-5 border-black transition-all duration-1000 ${!imagePath ? "opacity-0" : "opacity-100"}`}>
                <div className="font-bold">
                  Initial Hash:
                </div>
                <div className="text-xs">
                  {decoded}
                </div>
                <div className="font-bold">
                  Decoded Hash:
                </div>
                <div className="text-xs">
                  {message}
                </div>
                <div className="font-bold">
                  Predicted Accuracy:
                </div>
                <div>
                {bitAccuracy}
                </div>
                <div className="font-bold">
                  Conclusion:
                </div>
                <div className={bitAccuracy > 0.3 ? "text-green-500" : "text-red-500"}>
                  {bitAccuracy > 0.3 ? "Match" : "No Match"}
                </div>
              </div>
            : <div className={`w-92 h-80 rounded-xl text-white bg-white border-solid border-2 p-5 border-white transition-all duration-1000 ${!imagePath ? "opacity-0" : "opacity-100"}`}></div>
          }
        </div>
        </div>
    </div>
  )
}

export default DecodeInformation