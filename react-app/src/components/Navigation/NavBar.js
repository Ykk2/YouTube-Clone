import { NavLink } from "react-router-dom"
import './navigation.css'


const NavBar = () => {


    return (
        <div className="NavBar">
            <div className="NavBar-left">Left</div>
            <div className="NavBar-right">
                <NavLink>

                </NavLink>
            </div>
        </div>
    )
}

export default NavBar
