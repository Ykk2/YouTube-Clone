import { useSelector, useDispatch } from "react-redux"
import { useHistory } from 'react-router-dom'
import { logout } from "../../store/session"

const ProfileDropDown = ({ setShowMenu }) => {

    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogOutClick = (e) => {
        e.preventDefault()
        dispatch(logout())
        history.push('/')
    }

    const handleProfileClick = (e) => {
        e.preventDefault()
        history.push(`/user/${user.username}`)
        setShowMenu(false)
    }

    return (
        <div className="navbar-dropdown-menu">

            <div className="dropdown-userinfo">
                <span id="name">{user.firstName} {user.lastName}</span>
                <span id="username">{`@${user.username}`}</span>
            </div>

            <div className="dropdown-bottom">
                <div>
                    <a onClick={handleProfileClick}>Channel</a>
                </div>
                <div>
                    <a onClick={handleLogOutClick}>Sign out</a>
                </div>
            </div>
        </div>
    )
}

export default ProfileDropDown
