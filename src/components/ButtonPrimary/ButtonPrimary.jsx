import s from './style.module.css';

export function ButtonPrimary({ className, type, children, onClick, ondisabled }) {
    console.log("classanmaee");
    console.log(className);
    return (<>
        <button disabled={ondisabled} onClick={onClick} type={type} className={`btn btn-primary ${s.button} ${className}`} >
            {children}
        </button >
    </>)
}