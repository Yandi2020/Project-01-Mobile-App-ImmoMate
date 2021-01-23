import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import Screen from '../components/Screen'
import Card from '../components/Card'
import colors from '../config/colors'
import routes from '../navigation/routes'

function ListingsScreen({ navigation, listings }) {
    return (
        <Screen style={styles.screen}>
            <FlatList 
                data={listings}
                keyExtractor={listing => listing.id.toString()}
                renderItem={({ item }) => 
                    <Card 
                        title={item.title}
                        subTitle={item.details.price + ' €'}
                        image={item.images[0]}
                        icon={item.favourite}
                        onPress={() => navigation.navigate(routes.LISTING_DETAILS, 
                            { item: item, iconFav: 'heart' }
                        )}
                    />
                }
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps)(ListingsScreen);

