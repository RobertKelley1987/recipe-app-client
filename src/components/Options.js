import MoreSVG from './SVGs/MoreSVG';
import './Options.scss';

const Options = props => {
    return (
        <div className="options">
            {props.children}
            <MoreSVG className="options__svg" />
        </div>
    );
}

export default Options;