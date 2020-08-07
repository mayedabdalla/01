import {useField} from "formik";

const RadioField = (props) => {
    const [field, meta, helpers] = useField(props);
    return (
        <>
            <style jsx>{`
                   .container {
                        display: flex;
                        margin-bottom: 5px;
                   }
                   input {
                        opacity: 0;
                        position: fixed;
                        width: 0;
                   }
                   .checkmark {
                        width: 25px;
                        height: 25px;
                        background: yellow;
                        border-radius: 50%;
                        display: inline-block;
                        margin-left: 5px;
                   }
                   
                   input:checked + .checkmark {
                        background: red;
                        position: relative;
                        border: 5px solid green;
                   }
                   
                   input:focus + .checkmark {
                        background: orange;     
                   }
                    .checkmark:hover {
                        background-color: #dfd;
                    }
                    
            `}</style>
            <label className="container">
                <input {...field} value={props.value} {...props} type="radio" name="type"/>
                <div className="checkmark"></div>
                <span>{props.label}</span>
            </label>
        </>
    )
};
export default RadioField;