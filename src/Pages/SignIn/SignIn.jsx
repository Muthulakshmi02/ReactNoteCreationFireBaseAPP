import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary"
import { Link } from "react-router-dom"
import s from './style.module.css';
import { Input } from "components/Input/Input";
import { AuthLayout } from "layout/AuthLayout/AuthLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthAPI } from "api/Auth";
import { setUser } from "store/auth/auth-slice";
import { toast } from "validator/sweet-alert";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault();
        try {
            const user = await AuthAPI.signin(email, password)
            dispatch(setUser(user));
            await toast("success", "Auth Succeed");
            navigate("/");


        } catch (err) {
            alert("error", err.message);
        }

    }
    const form = (
        <div className={s.formContainer}>
            <h2 className={s.title}> Sign In <br />to access your team notes ! </h2>
            <form onSubmit={submit} className={s.formGroup}>
                <Input placeholder="email" onTextChange={setEmail} />
                <Input type="password" onTextChange={setPassword} placeholder="password" />

                <ButtonPrimary type="submit" className={s.button}>Submit</ButtonPrimary>
                <span>Don't have an account yet? Please<Link to={"/signup"}>SignUp</Link></span>
            </form>
        </div >
    )
    return (<AuthLayout children={form} />)
}