import { useState } from "react"
import ProfileDropDown from "./ProfileDropDown"

const ProfileButton = () => {

    const [showMenu, setShowMenu] = useState(false)

    const handleShowMenuClick = (e) => {
        e.preventDefault()
        if (showMenu === false) setShowMenu(true)
        if (showMenu === true) setShowMenu(false)
    }


    return (
        <div>
            <i onClick={handleShowMenuClick} className="fas fa-user-circle" />
            {
                showMenu && <ProfileDropDown setShowMenu={setShowMenu}/>
            }
        </div>

    )
}

export default ProfileButton
