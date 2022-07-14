import { LazyLoadImage } from 'react-lazy-load-image-component';
import ImgPlaceholder from './ImgPlaceholder';

const Img = ({ className, imgAlt, imgSrc }) => {
    return !imgSrc ? <ImgPlaceholder /> : <LazyLoadImage alt={imgAlt} className={className} effect="opacity" src={imgSrc} />;
}

export default Img;