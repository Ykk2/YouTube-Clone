import { useSelector } from "react-redux"
import LoginButton from "./LoginButton"
import ProfileButton from "./ProfileButton"
import './navigation.css'

const NavBar = () => {

    const user = useSelector(state => state.session.user)

    return (
        <div className="NavBar">
            <div className="navbar-container">
                <a href='/' className="NavBar-left">
                    <img className="logo" src={require('../../assets/images/youtube-logo-2431.svg').default} alt='svgImage' />
                    <span>uTube</span>
                </a>
                <div className="NavBar-right">
                    {user ?
                        <ProfileButton />
                        :
                        <LoginButton />
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar
