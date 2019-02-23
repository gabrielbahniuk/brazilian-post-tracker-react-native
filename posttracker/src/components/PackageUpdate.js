import React from 'react';

import { View, Text, StyleSheet, Dimensions } from 'react-native';

// import styles from './styles';

const PackageUpdate = ({ update }) => {
    return (
        <View style={styles.updateContainer}>
            <Text style={styles.updateText}>{update.status}</Text>
            <Text style={styles.updateText}>{update.trackedAt}</Text>
            <Text style={styles.updateText}>{update.unit}</Text>
            <Text style={styles.updateText}>
                Observação: {update.observation
                    ? update.observation
                    : 'Nenhuma observação.'
                }
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    updateContainer: {
        minHeight: 20,
        width: Dimensions.get('window').width - 20,
        marginBottom: 5,
        borderBottomColor: '#47315a',

    },
    updateText: {
        fontSize: 12,
    },
});
export default PackageUpdate;
