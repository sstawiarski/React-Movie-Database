import React from 'react';

import MoonLoader from 'react-spinners/MoonLoader';

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return isLoading ? (
        <MoonLoader />
    ) : (
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;