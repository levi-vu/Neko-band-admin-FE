import { PopupType } from "../../models/types/popup.type";
import "./popup.styles.scss";

function Popup(props: PopupType) {
  const { isOpen, title, width, content, handleActionClose } = props;
  return (
    <>
      {isOpen ? (
        <div>
          <div className='popup-backdrop'></div>
          <div className='popup'>
            <div className='popup-content' style={{ width: width }}>
              <div className='popup-header'>
                <span className='popup-title'>{title}</span>
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
