import React, {useState, useEffect, useRef} from 'react'
import {useInView} from 'react-intersection-observer'


const placeHolder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

export const LazyImage = ({page}) => {
    const [ref, inView, entry] = useInView()
    const [isValid, setIsValid] = useState<boolean>();
    const onError = () => {
        setIsValid(false)
    }

    useEffect(() => {
        setIsValid(true)
    }, [])
    console.log(`page/${page.image.filename}.jpg`)
    return (
        <section>
            <style jsx>{`
                section {
                    max-height: ${page.height}px;
                    overflow: hidden;
                }
                .wrapper {
                    position: relative;
                    padding-bottom: ${page.height / page.width * 100}%;
                    overflow: hidden;
                }
                .content {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                }
                .image {
                    display: block;
                    margin: 0 auto;
                    width: 100%;
                    max-width: ${page.width}px;
                }
        `}</style>
            <div className="wrapper" ref={ref}>
                <div className='content'>
                    {inView && isValid ? (
                        <picture>
                            <source srcSet={`/page/${page.image.filename}.webp`} type="image/webp"/>
                            <img onError={onError} className='image' src={`/page/${page.image.filename}.jpg`}/>
                        </picture>
                    ) : null}
                </div>
            </div>
        </section>)
}