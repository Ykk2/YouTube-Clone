import { NavLink, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { logout } from "../../store/session"
import './navigation.css'

const NavBar = () => {

    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)

    const dispatch = useDispatch()
    const history = useHistory()

    const handleShowMenuClick = (e) => {
        e.preventDefault()
        if (showMenu === false) setShowMenu(true)
        if (showMenu === true) setShowMenu(false)
    }

    const handleLogOutClick = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    const handleProfileClick = (e) => {
        e.preventDefault()
        history.push(`/user/${user.username}`)
        setShowMenu(false)
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
                { showMenu && user ?
                <div className="navbar-dropdown-menu">
                    <div>
                        <div>circle</div>
                        <div className="dropdown-userinfo">
                            <div>{user.firstName} {user.lastName}</div>
                            <div>{`@${user.username}`}</div>
                        </div>
                    </div>
                    <div className="dropdown-bottom">
                        <div className="dropdown-your-channel">
                            <i class="fa-solid fa-tv" />
                            <div onClick={handleProfileClick}>Your Channel</div>
                        </div>
                        <div className="dropdown-sign-out">
                            <i class="fa-solid fa-arrow-right-from-bracket"/>
                            <div onClick={handleLogOutClick}>Sign out</div>
                        </div>
                    </div>
                </div>
                :
                null
                }
            </div>
        </div>
    )
}

export default NavBar
