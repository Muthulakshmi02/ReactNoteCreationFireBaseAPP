import { PencilFill, TrashFill } from 'react-bootstrap-icons';
import s from './style.module.css';
import { ButtonPrimary } from 'components/ButtonPrimary/ButtonPrimary';
import { validator } from 'validator/validator';
import { useState } from 'react';
import { FieldError } from 'components/FieldError/FieldError';

const VALIDATOR = {
    title: (value) => {
        return validator.minValidation(value, 3) || validator.maxValidation(value, 20);;
    },
    content: (value) => {
        return validator.minValidation(value, 3);
    }
}

export function NoteForm({ isEditable = true, note, title, onClickEdit, onClickDelete, onClickSubmit }) {
    const [formValues, setFormValues] = useState({ title: note?.title || "", content: note?.content || "" })
    const [formError, setFormError] = useState({ title: note?.title ? undefined : true, content: note?.content ? undefined : true });
    const updateFormValues = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormValues({ ...formValues, [name]: value });
        updateError(name, value)
    }

    const updateError = (fieldName, fieldValue) => {
        setFormError({ ...formError, [fieldName]: VALIDATOR[fieldName](fieldValue) });

    }
    const actionIcons = (
        <>
            <div className="col-1">
                {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon} />}
            </div>
            <div className="col-1">
                {onClickDelete && <TrashFill onClick={onClickDelete} className={s.icon} />}
            </div>
        </>
    )
    const titleInput = (
        <div className="mb-5">
            <label className="form-label">Title</label>
            <input onChange={updateFormValues} type="text" name="title" className="form-control" value={formValues.title} />
            <FieldError msg={formError.title} />
        </div>
    )
    const contentInput = (
        <div className="mb-5">
            <label className="form-label">Content</label>
            <textarea onChange={updateFormValues} type="text" name="content" className="form-control" row="5" value={formValues.content} />
            <FieldError msg={formError.content} />
        </div>
    )

    const hasError = () => {
        for (const fieldName in formError) {
            if (formError[fieldName]) {
                return true
            }
        }
        return false
    }
    const submitButton = (
        <div className={s.submit_btn}>
            <ButtonPrimary ondisabled={hasError()} onClick={() => onClickSubmit(formValues)}>Submit</ButtonPrimary>
            <div />
        </div>)

    return (<div className={s.conatiner}>
        <div className="row justify-content-space-between">
            <div className="col-10">
                <h2 className="mb-3">{title}</h2>
            </div>
            {actionIcons}
        </div>
        <div className={`mb-3 ${s.title_input_container}`} >
            {isEditable && titleInput}
        </div>
        <div className="mb-3">{isEditable ? contentInput : <pre> {note.content} </pre>}</div>
        {onClickSubmit && submitButton}
    </div>)
}