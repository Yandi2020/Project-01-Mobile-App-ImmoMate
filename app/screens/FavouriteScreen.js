import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import Screen from '../components/Screen'
import Card from '../components/Card'
import colors from '../config/colors'
import routes from '../navigation/routes'
import AppText from '../components/layout/AppText'

function FavouriteScreen({ navigation, listings }) {
    const newListings = listings.filter(listing => listing.favourite == true);
    
    return (
        <Screen style={styles.screen}>
            { newListings.length == 0 && <View style={styles.container}>
                <AppText style={styles.empty}>Your Favourite List is Empty</AppText> 
              </View>
            }

            { newListings && <FlatList 
                data={newListings}
                keyExtractor={listing => listing.id.toString()}
                renderItem={({ item }) => 
                    <Card 
                        title={item.title}
                        subTitle={item.details.price + ' €'}
                        image={item.images[0]}
                        icon={item.favourite}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, 
                            { item: item, iconFav: 'delete' }
                        )}
                    />
                }
            />}
        </Screen>
    )
}

const styles = StyleSheet.create({
    empty: {
        fontSize: 26,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.medium,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    screen: {
        padding: 20,
        backgroundColor: colors.light,
    },
})

const mapStateToProps = (state) => {
    return {
        listings: state.listings
    }
}

export default connect(mapStateToProps)(FavouriteScreen)

