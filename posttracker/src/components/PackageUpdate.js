import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import config from '../config';
// import styles from './styles';
const { DATE_FORMAT } = config;
const PackageUpdate = ({ update }) => {
    return (
        <View style={styles.updateContainer}>
            <Text style={styles.updateText}>{update.status}</Text>
            <Text style={styles.updateText}>
                {moment.utc(new Date(update.trackedAt)).format(DATE_FORMAT)}
            </Text>
            <Text style={styles.updateText}>{update.unit}</Text>
            <Text style={styles.updateText}>
                Observations:
                {update.observation ? update.observation : 'No observations.'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    updateContainer: {
        minHeight: 20,
        width: Dimensions.get('window').width - 20,
        marginBottom: 5,
        borderBottomColor: '#47315a'
    },
    updateText: {
        fontSize: 12
    }
});
export default PackageUpdate;
