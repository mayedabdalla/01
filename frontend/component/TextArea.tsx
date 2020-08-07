import {FunctionComponent} from "react";
import {useField} from "formik";

interface Props {
    name: string;
    label: string
}

const TextArea: FunctionComponent<Props> = ({label, ...props}: Props) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <style jsx>{`
                textarea {
                    outline: none;
                    background: white;
                    resize: none;
                    border: 2px solid #73AD21;
                    border-radius: 5px;
                    color: purple;
                    height: 200px;
                    font-size: 18px;
                }
                textarea:focus {
                     box-shadow: 0 0 3pt 2pt green;
                }
                label {
                    margin-top: 5px;
                }
            `}</style>
            <label>
                <div>{label}</div>
                <textarea {...field} {...props} />
            </label>

        </>
    )
}
export default TextArea