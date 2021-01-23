import React, { useState, useContext } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import Slideshow from 'react-native-image-slider-show'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

import AppText from '../components/layout/AppText'
import colors from '../config/colors'
import ListItem from '../components/ListItem'
import AppMap from '../components/AppMap'
import useLocation from '../hooks/useLocation'
import { AuthContext } from '../context/AuthContext'
import { addFavourite, removeFavourite, deletePost } from '../actions/listingActions'

function ListingDetailsScreen({ route, navigation, addFavourite, removeFavourite, deletePost }) {
    const { item: listing, iconFav, posted } = route.params; 
    const [icon, setIcon] = useState('heart-outline');
    const { authenticated } = useContext(AuthContext);
    
    //Async takes some time to get data so we need { location && ... }
    const location = useLocation(listing.details.address);
    
    const like = () => {
        addFavourite(listing.id);
        setIcon('heart');
    }

    const remove = () => {
        removeFavourite(listing.id);
        navigation.navigate('Favourite');
    }

    const postDelete = () => {
        deletePost(listing.id);
        navigation.navigate('Posted Home');
    }

    const image = listing.contact.image === 'man' ? 
        (require('../../assets/avatar-man.png')) : (require('../../assets/avatar-woman.png'))

    return (
        <ScrollView>
            <Slideshow dataSource={listing.images} height={300} />

            <View style={styles.container}>
                <AppText style={styles.title}>{listing.title}</AppText>
                
                <View style={styles.heartContainer}>
                    <View style={styles.details}>
                        <AppText style={styles.price}>{listing.details.price}€</AppText>
                        <AppText style={[styles.price, styles.size]}>{listing.details.size}m²</AppText>
                        <AppText style={[styles.price, styles.size]}>{listing.details.rooms}rms</AppText>
                    </View>

                    { listing.favourite == false &&
                        <MaterialCommunityIcons name={icon} size={35} color={colors.primary} onPress={like} />
                    }

                    { listing.favourite && iconFav === 'heart' &&
                        <MaterialCommunityIcons name={iconFav} size={35} color={colors.primary} />
                    }

                    { listing.favourite && iconFav === 'delete' &&
                        <MaterialCommunityIcons name={iconFav} size={35} color={colors.primary} onPress={remove} />
                    }
                </View>

                <AppText>{listing.details.address}</AppText>

                { posted &&
                    <TouchableOpacity style={styles.deleteOffer} onPress={postDelete}>
                        <AppText style={styles.deleteText}>Delete Offer</AppText>
                        <MaterialCommunityIcons name='delete' size={35} color={colors.white} />
                    </TouchableOpacity>
                }

                <View style={styles.desContainer}>
                    <AppText style={styles.desTitle}>Property Description:</AppText>
                    <AppText style={styles.desc}>{listing.info.description}</AppText>
                </View>

                <View style={styles.contactBox}>
                    <ListItem 
                        image={image}
                        iconRight='phone-in-talk'
                        title={listing.contact.name}
                        subTitle={listing.contact.company}
                    />
                    <View style={styles.contactDetails}>
                        { authenticated == false && <AppText style={styles.login}>Please login to view the contact details</AppText> }
                        { authenticated && <ListItem
                            title={listing.contact.phone}
                            subTitle={listing.contact.email}
                        /> }
                    </View>
                </View>
                
                { location && <AppMap lat={location.latitude} lng={location.longitude}/> }
            </View>
        </ScrollView>
    )
}

//font size: small default 18, content 20, small title 21/22, big title 25.
const styles = StyleSheet.create({
    contactBox: {
        marginVertical: 30,
    },
    contactDetails: {
        backgroundColor: colors.primary
    },
    container: {
        backgroundColor: colors.light,
        padding: 20,
    },
    deleteOffer: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: colors.primary,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteText: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        marginRight: 5,
    }, 
    details: {
        flexDirection: 'row',
    },
    desContainer:{
        marginTop: 30,
        backgroundColor:colors.white,
        padding: 10,
        borderRadius: 15
    },
    desTitle:{
        fontSize: 21,
        fontWeight: '500',
        paddingBottom: 10,
    },
    desc:{
        fontSize: 20,
        textAlign: 'justify',
    },
    heart: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    login: {
        fontSize: 20,
        fontWeight: '500',
        backgroundColor: colors.secondary,
        paddingVertical: 15,
        textAlign: 'center',
    },
    price:{
        color: colors.tertiary,
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    size: {
        marginLeft: 15,
    },
    title: {
        fontSize: 25,
        fontWeight: '600',
    },
    heartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

const mapDispatchToProps = (dispatch) => {
    return {
        addFavourite: (id) => dispatch(addFavourite(id)),
        removeFavourite : (id) => dispatch(removeFavourite(id)),
        deletePost: (id) => dispatch(deletePost(id)),
    }
}

export default connect(null, mapDispatchToProps)(ListingDetailsScreen);

