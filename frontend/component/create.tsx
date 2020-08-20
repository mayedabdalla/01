import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Router from 'next/router'
import TextField from "./text-field";
import TextArea from "./TextArea";
import CoverField from "./CoverField";
import RadioField from "./RadioField";
import {useCreateComicMutation} from "../generated/graphql";
import styles from './create.module.css'
import {container } from './container.module.css';
const Create = () => {
    const [createComic, {data}] = useCreateComicMutation();
    return (
        <>
            <div className={container}>
                <h2>إضافة مانجا/مانهوا</h2>
                <Formik
                    initialValues={{name: "", type: "MANHWA", text: "", cover: null}}
                    onSubmit={async (values, {setStatus, setFieldError, setSubmitting, resetForm, setFieldTouched, setErrors}) => {
                        await new Promise(resolve => setTimeout(resolve, 3000));
                        try {
                            // @ts-ignore
                            const {data} = await createComic({variables: values});
                            resetForm()
                            setSubmitting(false);
                            await Router.push('/[comic]', `/${encodeURIComponent(data.createComic.name)}`);

                        } catch (e) {
                            e.graphQLErrors.map(_ => {
                                switch (_.extensions.code) {
                                    case "BAD_USER_INPUT":
                                        setFieldError(_.extensions.invalidArgs, _.message)
                                        break;
                                }
                            })
                        }
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .trim()
                            .required('Required'),
                        type: Yup.string().oneOf(['MANHWA', 'MANGA']).required(),
                        text: Yup.string()
                    })}
                >
                    {({errors, setFieldError, values, setStatus, status, touched, setFieldValue, isSubmitting, isValid}) => {
                        return (
                            <Form>
                                <p>{JSON.stringify(status?.message)}</p>
                                <div className={styles.comic}>
                                    <CoverField/>
                                    <div className={styles.desc}>
                                        <TextField name='name' label='الاسم'/>
                                        <fieldset>
                                            <legend>النوع</legend>
                                            <RadioField name='type' checked value='MANHWA' label="مانهوا"/>
                                            <RadioField name='type' value='MANGA' label="مانجا"/>
                                        </fieldset>
                                        <TextArea label='الوصف' name='text'/>
                                        <button disabled={isSubmitting} type="submit">Submit</button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </>
    )
}
export default Create;