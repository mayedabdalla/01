import {useField, useFormikContext} from "formik";
import {FunctionComponent} from "react";

const CoverField: FunctionComponent = () => {
    const [field, meta, helpers] = useField({name: 'cover'});
    const {setValue} = helpers;
    const {value} = field;

    const onChange = ({target: {validity, files: [file]}}: any): void => {
        if (validity.valid) setValue(file)
    };

    const onError = () => {
        setValue(null)
    }

    return (
        <>
            <style jsx>{`
                .container {
                    flex-basis: 100%;
                    flex-shrink: 0;
                }
                input {
                    display: none;
                }
                img {
                    object-fit: cover;
                    height: 100%;
                    width: 100%;
                }
                .cover {
                    display: block;
                    height: 0;
                    padding-top: 107.5%;
                    position: relative;
                    background: orange;
                }
                .preview {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 100%;
                    background: red;
                }
                label {
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                
                @media (min-width: 768px) {
                    .container {
                        flex-basis: 40%;
                    }
                   
                }
                @media (min-width: 992px) {
                    .container {
                        flex-basis: 27%;
                    }
                }
            `}</style>
            <div className='container'>
                <span className={'cover'}>
                    <div className="preview">
                        {value && <img onError={onError} src={URL.createObjectURL(value)}/>}
                    </div>
                    <label>
                        <span className="button">Browse</span>
                        <input type="file" accept=".jpg,.jpeg,.png" onChange={onChange} id="cover" name="cover"/>
                    </label>
                </span>
            </div>
        </>

    )
}
export default CoverField