import React, { useContext } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'

import AppFormField from '../components/form/AppFormField'
import SubmitButton from '../components/form/SubmitButton'
import Screen from '../components/Screen'
import FormImagePicker from '../components/form/FormImagePicker'
import colors from '../config/colors'
import AppText from '../components/layout/AppText'
import AppFormPicker from '../components/picker/AppFormPicker'
import CategoryPickerItem from '../components/picker/CategoryPickerItem'
import { addListing } from '../actions/listingActions'
import { AuthContext } from '../context/AuthContext'
import AppButton from '../components/layout/AppButton'

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(5).label('Title'),
    price: Yup.number().required().min(1).max(10000).label('Price'),
    size: Yup.number().required().min(1).label('Size'),
    rooms: Yup.number().required().min(1).label('Rooms'),
    category: Yup.object().required().label('Category'),
    address: Yup.string().required().min(5).label('Address'),

    images: Yup.array().min(1, 'Please select at least one image.'), 

    gender: Yup.object().required().label('Gender'),
    firstName: Yup.string().required().label('First Name'),
    lastName: Yup.string().required().label('Last Name'),
    company: Yup.string().required().label('Company'),
    phone: Yup.number().positive().integer().required().label('Phone'),
    email: Yup.string().email().required().label('Email'),

    description: Yup.string().label('Description'),
});

const genders = [
    { label: 'Ms.', value: 'woman', backgroundColor: '#fc5c65', icon: 'human-female' },
    { label: 'Mr.', value: 'man', backgroundColor: '#2bcbba', icon: 'human-male' },
];

const categories = [
    { label: 'Apartment', value: 1, backgroundColor: '#fed330', icon: 'window-closed-variant' },
    { label: 'House', value: 2, backgroundColor: '#fd9644', icon: 'home' },
];

const initialValues = {
    title: '', price: '', size: '',
    rooms: '', address: '', images: [],
    firstName: '', lastName: '', company: '',
    description: '', category: '', gender: '',
    email: '', phone: '',
}

function AddListingScreen({ navigation, addListing }) {
    const { authenticated, currentUser } = useContext(AuthContext);

    return (
        <Screen style={styles.container}>
            { authenticated == false && 
                <View style={styles.loginContainer}>
                    <AppText style={styles.login}>Please login to post a new offer</AppText>
                    <AppButton title='Login' onPress={() => navigation.navigate('Login', {target: 'Add'})} />
                    <AppButton title='Register Now' onPress={() => navigation.navigate('Register', {target: 'Add'})} />
                </View>
            }

            { authenticated && <Formik
                initialValues={initialValues}
                onSubmit={(values, { resetForm }) => {
                        let newValues = { ...values, userId: currentUser.id }
                        addListing(newValues);
                        navigation.navigate('Listings');
                        resetForm({values: initialValues});
                        //console.log(values);
                }}
                validationSchema={validationSchema}
            >
                {() => (
                    <ScrollView>
                        <View style={styles.basic}>
                            <AppText style={styles.title}>New Property</AppText>
                            <AppFormField 
                                name='title' 
                                placeholder='Title' 
                                maxLength={255}
                            />
                            <AppFormField 
                                name='price'
                                placeholder='Price €'
                                keyboardType='numeric'
                                maxLength={8} 
                            />
                            <AppFormField 
                                name='size'
                                placeholder='Size m²'
                                keyboardType='numeric'
                            />
                            <AppFormField 
                                name='rooms'
                                placeholder='Rooms'
                                keyboardType='numeric'
                            />
                            <AppFormPicker 
                                name='category'
                                numberOfColumns={2}
                                PickerItemComponent={CategoryPickerItem}
                                placeholder='Category'
                                items={categories}
                                width='50%'
                            />
                            <AppFormField 
                                name='address' 
                                placeholder='Address' 
                                maxLength={255}
                            />
                        </View>

                        <View style={styles.basic}>
                            <AppText style={styles.title}>Images</AppText>
                            <FormImagePicker name='images' />
                        </View>

                        <View style={styles.basic}>
                            <AppText style={styles.title}>Contact</AppText>
                            <AppFormPicker 
                                name='gender'
                                numberOfColumns={2}
                                PickerItemComponent={CategoryPickerItem}
                                placeholder='Gender'
                                items={genders}
                                width='50%'
                            />
                            <AppFormField 
                                name='firstName' 
                                placeholder='First Name' 
                                maxLength={255}
                            />
                            <AppFormField 
                                name='lastName' 
                                placeholder='Last Name' 
                                maxLength={255}
                            />
                            <AppFormField 
                                name='company' 
                                placeholder='Company' 
                                maxLength={255}
                            />
                            <AppFormField 
                                name='phone'
                                placeholder='Phone Number'
                                keyboardType='numeric'
                            />
                            <AppFormField 
                                name='email' 
                                placeholder='Email' 
                                maxLength={255}
                            />
                        </View>
                        
                        <View style={styles.basic}>
                            <AppText style={styles.title}>Property Description</AppText>
                            <AppFormField 
                                name='description'
                                placeholder='Description'
                                maxLength={255}
                                multiline
                                numberOfLines={8} 
                            />
                        </View>

                        <SubmitButton title='Post' />
                    </ScrollView>
                )}
            </Formik> } 
        </Screen>
    )
}

const styles = StyleSheet.create({
    basic: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
    },
    container: {
        padding: 10,
        backgroundColor: colors.light,
    },
    login: {
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.medium,
        marginBottom: 35,
    }, 
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 21,
        fontWeight: '500',
        paddingBottom: 10,
        color: colors.primary,
    },
})

const mapStateToProps = (state) => {
    return {
        listings: state.listings
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addListing: (values) => { dispatch(addListing(values)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddListingScreen);

