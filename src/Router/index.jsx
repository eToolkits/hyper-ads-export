import React from 'react'
import PrivateRouter from './PrivateRouter/index.jsx'
// import PublicRouter from './PublicRouter/index.jsx'

const RouterWrapper = () => {
    return (
        <>
            <PrivateRouter />
            {/* <PublicRouter /> */}
        </>
    )
}

export default RouterWrapper
