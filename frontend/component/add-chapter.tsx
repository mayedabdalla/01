import Router, {useRouter} from "next/router";
import {Form, Formik} from "formik";
import TextField from "./text-field";
import PagesInput from "./PagesInput";
import React from "react";
import {useAddChapterMutation} from "../generated/graphql";
import * as Yup from "yup";
import {container} from "./container.module.css"

const AddChapter = () => {
    const router = useRouter()
    const {comic} = router.query
    const [addChapter, {data}] = useAddChapterMutation();
    return (
        <div className={container}>
            <Formik
                initialValues={{name: "", pages: []}}
                onSubmit={async (values, {resetForm, setFieldError, setFormikState, setStatus, setSubmitting}) => {
                    try {
                        if (!values.pages) {
                            setFieldError('pages', 'عليك اضافة صفحات');
                            return;
                        }
                        console.log({...values, comicName: comic.toString()})
                        const {data} = await addChapter({variables: {...values, comicName: comic.toString()}});
                        resetForm()
                        setSubmitting(false);
                        await Router.push('/[comic]/[chapter]', `/${comic}/${encodeURIComponent(data.addChapter.id)}`);
                    } catch (e) {

                        setStatus({
                            message: e.message
                        })
                    }
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .trim()
                        .required('Required'),
                })}

            >
                {({isSubmitting, setStatus, status}) => {

                    return (<Form>
                        <TextField name='name' label='الاسم'/>
                        <PagesInput/>
                        <button type="submit">Submit</button>
                    </Form>);
                }}
            </Formik>
        </div>
    )
};

export default AddChapter;