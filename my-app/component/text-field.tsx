import {useField} from "formik";
import {FunctionComponent} from "react";

interface Props {
    name: string;
    label: string
}

const TextField : FunctionComponent<Props> = ({label, ...props}:Props) => {
    const [field, meta, helpers] = useField(props);
    return (<>
        <style jsx>{`
            div {
                display: flex;
                align-items: center;
            }
            input {
                border-radius: 5px;
                border: 2px solid #73AD21;
                height: 50px;
                padding: 0 20px;
                color: purple;
                font-size: 18px;
            }
            input:focus {
                outline: none;
                box-shadow: 0 0 3pt 2pt green;
            }
            input {
                ${meta.error && meta.touched && `
                    background: red;
                `}
            }
            span {
                color: purple;
                font-size: 20px;
                font-weight: bold;
                margin-right: 20px;
            }
                            label {
                    margin-top: 5px;
                }
        `}</style>
        <label>
            <div>{label}</div>
            <input placeholder={label} {...field} />
        </label>
        {meta.touched && meta.error ? (
            <span className='error'>{meta.error}</span>
        ) : null}
    </>)
}
export default TextField;