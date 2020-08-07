import {useEffect, useState} from "react";

const Cover = ({cover, ...props}) => {
    const fallbackUrl = 'https://i.imgur.com/BcnI7TY.png';
    const [isValid, setIsValid] = useState<boolean>();
    useEffect(() => {
        setIsValid(true);
    }, [])
    const onError = (event) => {
        setIsValid(false)
    }

    return (
        <div>
            <style jsx>{`
                div {
                    // flex-basis: 100%;
                    background: #666666;
                    // flex-shrink: 0;
                    width: 100%;
                }
                span {
                    display: block;
                    height: 0;
                    padding-top: 107.5%;
                    position: relative;
                }
                picture {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                }
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                // @media (min-width: 768px) {
                //     div {
                //         flex-basis: 40%;
                //         background: yellow;
                //     }
                //   
                // }
                // @media (min-width: 992px) {
                //     div {
                //         flex-basis: 27%;
                //     }
                //
                // }
            `}</style>
            <span>
                {isValid && cover ? (
                    <picture className="cover">
                        {/*<source srcSet={`cover/${cover.filename}.webp`} type="image/webp"/>*/}
                        {/*<img onError={onError} src={isValid && cover && `cover/${cover.filename}.jpeg`} {...props}/>                      */}
                        <source
                            srcSet={`cover/${cover.filename}@1.webp, cover/${cover.filename}@2.webp 2x`}
                            type="image/webp"/>
                        <img
                            onError={onError}
                            src={`cover/${cover.filename}@1.jpg`}
                            srcSet={`cover/${cover.filename}@1.jpg, cover/${cover.filename}@2.jpg 2x`} {...props}
                        />
                    </picture>
                ) : null}
            </span>
        </div>
    )
}
export default Cover;