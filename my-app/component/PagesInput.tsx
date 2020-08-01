import {ErrorMessage, useField, useFormikContext} from "formik";
import React, {useRef} from "react";

const isImage = (file: File) => {
    const exts = ['jpeg', 'png', 'jpg'];
    const fileExt = file.name.match(/\.([^\.]+)$/)[1].toLowerCase();
    if (!exts.includes(fileExt)) {
        throw new Error(`الملف ${file.name} غير مدعوم`)
    }
    return true
}

const PagesInput = () => {
    // const {setFieldValue, values, setStatus, setFieldError, status} = useFormikContext();
    //
    const [field, meta, helpers] = useField({name: 'pages'});
    const {setValue, setError} = helpers;
    const {value} = field;

    function onChange(event) {
        try {
            Array.from(event.target.files).forEach((file: File) => {
                isImage(file)
            })
            if (event.target.validity.valid) setValue([...value, ...Array.from(event.target.files)]);
        } catch (e) {
            setError(e.toString())
            event.target.value = '';
        }
    }


    return (
        <>
            <style jsx>{`
                .preview {
                    background: pink;
                    height: 500px;
                    overflow: scroll;
                }
                ul {
                    display: flex;
                    list-style-type: none;
                    padding-right: 0;
                    flex-wrap: wrap;
                }
                li {
                    width: 200px;
                    height: 300px;
                    overflow: hidden;
                    border: 1px solid black;
                    display: flex;
                    flex-direction: column;
                    border-radius: 3px;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                li .image {
                    height: 250px;
                }
                
                
               input {
                    display: none;
               }
               label {
                    display: inline-block;
                    background: yellow;
                    padding: 11px 20px;
                    border-radius: 2px;
                    margin-top: 10px;
               }
               label p {
                    margin: 0 0;
               }
                
            `}</style>
            <label>
                <p>اضغط هنا لاضافة الصفحات</p>
                <input
                    type="file"
                    name="pages"
                    onChange={onChange}
                    accept=".jpg,.jpeg,.png"
                    multiple

                />
            </label>
            <ErrorMessage name="pages"/>
            <div className='preview'>
                <ul>
                    {value && Array.from(value).map((page, i) => {
                        return (<li key={i}>
                            <div className={'image'}>
                                <img src={URL.createObjectURL(page)}/>
                            </div>
                            <div className="number">
                                الصفحة {i}
                            </div>
                        </li>)
                    })}
                </ul>
            </div>
        </>
    )
}
export default PagesInput;