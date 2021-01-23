import React, { useContext } from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'

import Screen from '../components/Screen'
import AppFormField from '../components/form/AppFormField'
import SubmitButton from '../components/form/SubmitButton'
import colors from '../config/colors'
import { AuthContext } from '../context/AuthContext'
import AppText from '../components/layout/AppText'

const validationSchema = Yup.object().shape({
    firstname: Yup.string().required().label("FirstName"),
    lastname: Yup.string().required().label("LastName"),
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
    gender: Yup.string().required().label("Gender"),
});

const initialValues = { firstname: '', lastname: '', email: '', password: '', gender: '' }

export default function RegisterScreen({ route, navigation }) {
    const { authenticated, register } = useContext(AuthContext);
    const { target } = route.params;

    return (
        <Screen style={styles.container}>
            <View style={styles.image}>
                <Image source={require('../../assets/Logo-IM-light.png')} style={styles.logo} />
            </View>

            { authenticated && 
                <View style={styles.loggedContainer}>
                    <AppText style={styles.loggedIn}>You have already logged in</AppText> 
                </View>
            }
            
            { authenticated == false &&
                <Formik
                    initialValues={initialValues}
                    onSubmit={
                        (values, { resetForm }) => {
                            register(values);
                            navigation.navigate(target);
                            resetForm({values: initialValues});
                        }
                    }
                    validationSchema={validationSchema}
                >
                    {() => (
                        <>
                            <AppFormField 
                                autoCorrect={false}
                                icon="account"
                                name="firstname"
                                placeholder="First Name" 
                            />
                            <AppFormField 
                                autoCorrect={false}
                                icon="account"
                                name="lastname"
                                placeholder="Last Name" 
                            />
                            <AppFormField 
                                autoCapitalize='none'
                                autoCorrect={false}
                                icon='email'
                                keyboardType='email-address'
                                name='email'
                                placeholder='Email'
                                textContentType='emailAddress' 
                            />
                            <AppFormField
                                autoCapitalize='none'
                                autoCorrect={false}
                                icon='lock'
                                name='password'
                                placeholder='Password'
                                secureTextEntry={true}
                                textContentType='password' 
                            />
                            <AppFormField 
                                autoCorrect={false}
                                icon="gender-male-female"
                                name="gender"
                                placeholder="Gender: Male / Female" 
                            />
                            <SubmitButton title='Register' />
                        </>
                    )}
                </Formik> 
            }
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 150,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20,
    },
    loggedIn: {
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.medium,
    }, 
    loggedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        marginBottom: 10,
    },
})

