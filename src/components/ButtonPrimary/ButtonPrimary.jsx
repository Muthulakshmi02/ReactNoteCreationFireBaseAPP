import s from './style.module.css';

export function ButtonPrimary({ children, onClick, ondisabled }) {
    return (<>
        <button disabled={ondisabled} onClick={onClick} type="button" className={`btn btn-primary ${s.button}`} >
            {children}
        </button >
    </>)
}