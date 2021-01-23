import React, { useContext } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Screen from '../components/Screen'
import ListItem from '../components/ListItem'
import colors from '../config/colors'
import Icon from '../components/Icon'
import ListItemSeparator from '../components/ListItemSeperator'
import { AuthContext } from '../context/AuthContext'
import AppText from '../components/layout/AppText'
import AppButton from '../components/layout/AppButton'

const menuItems = [
    {
        title: 'My Favourite',
        icon: {name: 'heart-plus-outline', backgroundColor: colors.primary},
        targetScreen: 'My Favourite',
    },
    {
        title: 'Posted Home',
        icon: {name: 'upload', backgroundColor: colors.tertiary},
        targetScreen: 'Posted Home',
    },
    {
        title: 'Send Feedback',
        icon: {name: 'mail', backgroundColor: colors.medium},
        targetScreen: 'Send Feedback',
    },
] 

const male = require('../../assets/user-man.png');
const female = require('../../assets/user-woman.png');

export default function AccountScreen({ navigation }) {
    // const image = currentUser.gender === 'male' ? 
    //     (require('../../assets/user-man.png')) : (require('../../assets/user-woman.png'));
    
    const { authenticated, currentUser, logout } = useContext(AuthContext);

    const image = currentUser.gender === 'Male' ? male : female
    
    return (
        <>
            { authenticated == false && 
                <Screen style={styles.unauthScreen}>
                    <View style={styles.loginContainer}>
                        <AppText style={styles.login}>Please login to view your account</AppText>
                        <AppButton title='Login' onPress={() => navigation.navigate('Login', {target: 'Account'})} />
                        <AppButton title='Register Now' onPress={() => navigation.navigate('Register', {target: 'Account'})} />
                    </View>
                </Screen>
            }

            { authenticated && 
                <Screen style={styles.authScreen}>
                    <View style={styles.container}>
                        <ListItem 
                            title={currentUser.firstname + ' ' + currentUser.lastname}
                            subTitle={currentUser.email}
                            image={image}
                        />
                    </View>

                    <View style={styles.container}>
                        <FlatList 
                            data={menuItems}
                            keyExtractor={item => item.title}
                            ItemSeparatorComponent={ListItemSeparator}
                            renderItem={({ item }) => 
                                <ListItem 
                                    title={item.title}
                                    IconComponent={<Icon 
                                        name={item.icon.name}
                                        backgroundColor={item.icon.backgroundColor}
                                    />}
                                    onPress={() => navigation.navigate(item.targetScreen)}
                                />
                            }
                        />
                    </View>
                    
                    <ListItem 
                        title='Log Out'
                        IconComponent={<Icon name='logout' backgroundColor={colors.danger} />}
                        onPress={() => logout()}
                    /> 
                </Screen> 
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    unauthScreen: {
        padding: 10,
        backgroundColor: colors.light,
    },
    authScreen: {
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
})


