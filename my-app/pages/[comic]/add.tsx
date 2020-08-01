import Layout from "../../component/layout";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useRef} from "react";
import {file} from "@babel/types";
import {useFormik, useFormikContext} from 'formik';
import * as Yup from "yup";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Router, {useRouter} from "next/router";
import TextField from "../../component/text-field";
import PagesInput from "../../component/PagesInput";



const ADD_CHAPTER = gql`
    mutation addChapter($name: String, $pages: Upload, $comicName: String) {
        addChapter(name: $name, pages: $pages, comicName: $comicName ) {
            id
        }
    }
`;

export default () => {
    const router = useRouter()
    const {comic} = router.query
    const [addChapter, {data}] = useMutation(ADD_CHAPTER);
    return (
        <Layout>
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
        </Layout>
    )

}