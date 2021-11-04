import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function DialogBox(props) {
  return (
    <>
      <div className="flex items-center bg-white rounded-lg border-2 h-10 px-3.5">
        {props.message}
      </div>
      <Icon className='absolute top-2 -left-2 text-2xl text-red-500' icon={faCaretLeft}></Icon>
    </>
  );
}

export default DialogBox;
