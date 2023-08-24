import s from './style.module.css';
import { Logo } from 'components/logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import logoSrc from 'assets/images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from "store/auth/authSelector"
import { AuthAPI } from 'api/Auth';
import { setUser } from 'store/auth/auth-slice';

export function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const signout = () => {
        AuthAPI.signout();
        dispatch(setUser(null));
    }
    const renderAuthProfile = () => {
        return (
            <div>
                <img src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`} alt="" style={{ width: 40 }} className="rounded-circle" />
                <div>Hello, {user.email}</div>
                <Link to="#" onClick={signout}> SignOut</Link>
            </div>
        )
    }

    return (
        <>
            <div className={`row ${s.conatiner}`}>
                <div className="col-xs-12 col-sm-4">
                    <Logo onClick={() => navigate("/")} title="React Notes" subtitle={"Manage your notes"} image={logoSrc} />
                </div>
                <div className="col-xs-12 col-ms-8 text-end">
                    {renderAuthProfile()}
                </div>
            </div>
        </>
    )
}