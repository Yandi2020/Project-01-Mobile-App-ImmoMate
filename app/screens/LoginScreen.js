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
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});

const initialValues = { email: '', password: '' }

export default function LoginScreen({ route, navigation }) {
    const { authenticated, login } = useContext(AuthContext);
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
                            login(values);
                            navigation.navigate(target);
                            resetForm({values: initialValues});
                        }
                    }
                    validationSchema={validationSchema}
                >
                    {() => (
                        <>
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
                            <SubmitButton title='Login' />                 
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
        width: 155,
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
    signup: {
        marginVertical: 30,
    },
})

