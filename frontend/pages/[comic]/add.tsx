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
        </Layout>
    )

}