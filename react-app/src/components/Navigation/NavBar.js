import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import './navigation.css'

const NavBar = () => {

    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)


    const handleShowMenuClick = (e) => {
        e.preventDefault()
        if (showMenu === false) setShowMenu(true)
        if (showMenu === true) setShowMenu(false)
    }

    return (
        <div className="NavBar">
            <div className="NavBar-left">Left</div>
            <div className="NavBar-right">
                { user ?
                <div>
                    <i onClick={handleShowMenuClick} class="fa-regular fa-circle" />
                </div>
                :
                <NavLink to="/login">
                    <i class="fa-regular fa-circle-user"></i>
                    <span>Sign in</span>
                </NavLink>
                }
                { showMenu ?
                <div className="navbar-dropdown-menu">
                    <div>
                        <div>circle</div>
                        <div >
                            <div>{user.firstName} {user.lastName}</div>
                            <div>{`@${user.username}`}</div>
                        </div>
                    </div>
                    <div className="dropdown-divider" >Your Channel</div>
                    <div>Sign out</div>
                </div>
                :
                null
                }
            </div>
        </div>
    )
}

export default NavBar
