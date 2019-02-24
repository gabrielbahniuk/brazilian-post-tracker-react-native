import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PackageUpdate from '../components/PackageUpdate';
import moment from 'moment';
import config from '../config';

const TrackDetails = props => {
    const {
        trackDetails: { data }
    } = props.navigation.state.params;
    const { DATE_FORMAT } = config;
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Posted at:</Text>
                <Text style={styles.value}>
                    {moment.utc(new Date(data.postedAt)).format(DATE_FORMAT)}
                </Text>
            </View>
            <View>
                <Text style={styles.title}>Last update:</Text>
                <Text style={styles.value}>
                    {moment.utc(new Date(data.updatedAt)).format(DATE_FORMAT)}
                </Text>
            </View>
            <View>
                <Text style={styles.title}>Delivered:</Text>
                <Text style={styles.value}>
                    {data.isDelivered ? 'Yes' : 'No'}
                </Text>
            </View>
            <View>
                <Text style={styles.title}>Updates History</Text>
            </View>

            <FlatList
                data={data.track}
                keyExtractor={update => update.trackedAt}
                renderItem={({ item }) => <PackageUpdate update={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        borderColor: '#eee'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 16
    }
});

TrackDetails.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.trackCode.toUpperCase()
});

export default TrackDetails;
