import Layout from "../../component/layout";
import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useRef} from "react";
import * as Yup from "yup";
import Router, {useRouter} from "next/router";
import TextField from "../../component/text-field";
import PagesInput from "../../component/PagesInput";
import {useAddChapterMutation} from "../../generated/graphql";
import AddChapter from "../../component/add-chapter";


export default () => {
    return (
        <Layout>
            <AddChapter/>
            {/*<Formik*/}
            {/*    initialValues={{name: "", pages: []}}*/}
            {/*    onSubmit={async (values, {resetForm, setFieldError, setFormikState, setStatus, setSubmitting}) => {*/}
            {/*        try {*/}
            {/*            if (!values.pages) {*/}
            {/*                setFieldError('pages', 'عليك اضافة صفحات');*/}
            {/*                return;*/}
            {/*            }*/}
            {/*            console.log({...values, comicName: comic.toString()})*/}
            {/*            const {data} = await addChapter({variables: {...values, comicName: comic.toString()}});*/}
            {/*            resetForm()*/}
            {/*            setSubmitting(false);*/}
            {/*            await Router.push('/[comic]/[chapter]', `/${comic}/${encodeURIComponent(data.addChapter.id)}`);*/}
            {/*        } catch (e) {*/}

            {/*            setStatus({*/}
            {/*                message: e.message*/}
            {/*            })*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    validationSchema={Yup.object({*/}
            {/*        name: Yup.string()*/}
            {/*            .trim()*/}
            {/*            .required('Required'),*/}
            {/*    })}*/}

            {/*>*/}
            {/*    {({isSubmitting, setStatus, status}) => {*/}

            {/*        return (<Form>*/}
            {/*            <TextField name='name' label='الاسم'/>*/}
            {/*            <PagesInput/>*/}
            {/*            <button type="submit">Submit</button>*/}
            {/*        </Form>);*/}
            {/*    }}*/}
            {/*</Formik>*/}
        </Layout>
    )

}