import css from './NoteForm.module.css'
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import type { Tags } from '@/types/note';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api';

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    content: Yup.string()
        .max(500, "Too Long!"),
    tag: Yup.string()
        .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
        .required("Required"),
});

interface NoteFormValues {
    title: string,
    content: string,
    tag: Tags
}
interface NoteFormProps {
    onCancel: () => void,
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo" as Tags
}


export default function NoteForm({ onCancel }: NoteFormProps) {
    const fieldId = useId();
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            onCancel();
        },
        onError: (error) => {
            console.error("Failed to create note:", error);
        }
    })

    const handleSubmit = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
        mutate(values);
        actions.resetForm();
    };
    return (
        <Formik initialValues={initialValues}
            validationSchema={NoteFormSchema}
            onSubmit={handleSubmit}>

            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                    <Field id={`${fieldId}-title`} type="text" name="title" className={css.input} />
                    <ErrorMessage component="span" name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-content`}>Content</label>
                    <Field as="textarea"
                        id={`${fieldId}-content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage component="span" name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage name="tag" component="span" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button onClick={onCancel} type="button" className={css.cancelButton}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={isPending}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    )
}