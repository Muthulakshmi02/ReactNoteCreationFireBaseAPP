import s from './style.module.css';
import { Logo } from 'components/logo/Logo';
import { useNavigate } from 'react-router-dom';
import logoSrc from 'assets/images/logo.png';
import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary'

export function Header() {
    const navigate = useNavigate();
    return (
        <>
            <div className={`row ${s.conatiner}`}>
                <div className="col-xs-12 col-sm-4">
                    <Logo onClick={() => navigate("/")} title="React Notes" subtitle={"Manage your notes"} image={logoSrc} />
                </div>
                <div className="col-xs-12 col-ms-8 text-end">
                    <ButtonPrimary onClick={() => navigate("/note/new")}> Add Note +</ButtonPrimary>
                </div>
            </div>
        </>
    )
}