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

export function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const user = await AuthAPI.signup(email, password)
                dispatch(setUser(user));
                await toast("success", "SignUp successed, you are now logged in.");
                navigate("/");


            } catch (err) {
                toast("error", err.message);
            }
        } else {
            toast("Error", "Your password don't match");
        }

    }
    const form = (
        <div className={s.formContainer}>
            <h2 className={s.title}> Sign Up <br />to access your team notes ! </h2>
            <form onSubmit={submit} className={s.formGroup}>
                <Input placeholder="email" onTextChange={setEmail} />
                <Input type="password" onTextChange={setPassword} placeholder="password" />
                <Input type="password" onTextChange={setConfirmPassword} placeholder="confirm password" />


                <ButtonPrimary type="submit" className={s.button}>Submit</ButtonPrimary>
                <span>Already have an account ? <Link to={"/signin"}>Signin</Link></span>
            </form>
        </div >
    )
    return (<AuthLayout children={form} />)
}