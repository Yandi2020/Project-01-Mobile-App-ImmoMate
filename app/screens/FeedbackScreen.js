import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import AppText from '../components/layout/AppText'
import AppFormField from '../components/form/AppFormField'
import SubmitButton from '../components/form/SubmitButton'
import colors from '../config/colors'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5).label('Title'),
    content: Yup.string().required().label('Content'),
});

const initialValues = {
    title: '', 
    content: '',
}

function FeedbackScreen ({ navigation }) {
    return (
        <Screen style={styles.container}>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    navigation.navigate('Account');
                }}
                validationSchema={validationSchema}
            >
                {() => (
                    <View style={styles.basic}>
                        <AppText style={styles.title}>Feedback</AppText>
                        <AppFormField 
                            name='title' 
                            placeholder='Title' 
                            maxLength={255}
                        />
                        <AppFormField 
                            name='content'
                            placeholder='Content'
                            maxLength={255}
                            multiline
                            numberOfLines={12} 
                        />
                        <SubmitButton title='Send' />
                    </View>
                )}
            </Formik>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: colors.light,
    },
    basic: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 15,
        marginTop: '40%',
    },
    title: {
        fontSize: 21,
        fontWeight: '500',
        paddingVertical: 15,
        color: colors.primary,
    },
})

export default FeedbackScreen;

