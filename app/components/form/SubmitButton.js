import React from 'react'
import { useFormikContext } from 'formik'

import AppButton from '../layout/AppButton'

export default function SubmitButton({ title, color, textColor }) {
    const { handleSubmit } = useFormikContext();

    return (
        <AppButton 
            title={title} 
            onPress={handleSubmit} 
            color={color} 
            textColor={textColor}
        />
    )
}

