import { AiOutlineHome } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import './header.styles.scss';

export default function Header(){
  return (
    <>
       <div className="header-container">
          <Link to="/">
            <AiOutlineHome className="icon-home" />
          </Link>
        </div>
        <Outlet />
    </>
  );
}
