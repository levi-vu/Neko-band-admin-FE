import {PopupType} from "../../types/popup.type";
import "./popup.styles.scss";

type PopupProps = {
  props: PopupType;
};

function Popup({props}: PopupProps) {
  const {isOpen, title, width, height, content, handleActionClose} = props;
  return (
    <>
      {isOpen ? (
        <div>
        <div className="popup-backdrop"></div>
        <div className='popup'>
          <div className='popup-content' style={{width: width, height: height}}>
            <div className='popup-title'>
              {title}
              <button className='button-close' onClick={() => handleActionClose(false)}>
                x
              </button>
            </div>
            <div className='popup-body'>{content}</div>
          </div>
        </div>
        </div>
      ) : null}
    </>
  );
}

export default Popup;
