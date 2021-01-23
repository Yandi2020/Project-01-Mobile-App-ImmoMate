import React from 'react'
import { useFormikContext } from 'formik'

import AppTextInput from '../layout/AppTextInput'
import ErrorMessage from '../layout/ErrorMessage'

export default function AppFormField({ name, width, color, ...otherProps }) {
    const { setFieldTouched, handleChange, errors, touched, values } = useFormikContext(); 

    return (
        <>
            <AppTextInput 
                onBlur={() => setFieldTouched(name)}
                onChangeText={handleChange(name)}
                width={width}
                value={values[name]}
                {...otherProps}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]} color={color} />
        </>
    )
}

