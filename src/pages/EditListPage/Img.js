import { useState } from 'react';
import ImgPlaceholder from "../../components/ImgPlaceholder";

const Img = ({ resultImg, resultName }) => {
    // track whether the img for this result could not be found
    const [imgError, setImgError] = useState(false);

    if(resultImg && !imgError) {
        return <img className="search-result__img" onError={() => setImgError(true)} src={resultImg} alt={resultName}/>
    } else {
        return <ImgPlaceholder letter={resultName.slice(0, 1)} className={'search-result__img-placeholder'}/>
    }
}

export default Img;