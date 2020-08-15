import React, {ReactNode} from "react";

type Props = {
    children: ReactNode
}

const Container = ({children}: Props) => {
    return (
        <>
            <style jsx>{`
                div {
                    width: 100%;
                    padding: 0 15px;
                    margin: 0 auto;
                }
                @media (min-width: 576px) {
                    div {
                        width: 540px;
                    }
                }

                @media (min-width: 768px) {
                    div {
                        width: 720px;
                    }
                }
                @media (min-width: 992px) {
                    div {
                        width: 960px;
                    }
                }

                @media (min-width: 1200px) {
                    div {
                        width: 1140px;
                    }
                }
            `}</style>
            <div>
                {children}
            </div>
        </>
    )
}
export default Container;