import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native';

// import styles from './styles';

export default class Packet extends Component {
    state = {
        trackDetails: {}
    };

    handleSearch = async () => {
        const { trackCode } = this.props;

        const response = await api.get(`/track/${trackCode}/json`);

        this.setState({
            trackDetails: response.data
        });

        const { trackDetails } = this.state;

        this.props.navigation.navigate('TrackDetails', {
            trackDetails,
            trackCode
        });
    };

    render() {
        return (
            <View style={styles.packetContainer}>
                <Text style={styles.packetText}>
                    {this.props.trackCode.toUpperCase()}
                </Text>
                <TouchableOpacity
                    style={styles.buttonProceed}
                    onPress={this.handleSearch}
                >
                    <Icon
                        name="package"
                        size={24}
                        color={styles.buttonProceed.color}
                    />
                    <Icon
                        name="forward"
                        size={24}
                        color={styles.buttonProceed.color}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    packetContainer: {
        borderRadius: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 60,
        width: Dimensions.get('window').width - 20,
        marginBottom: 10,
        marginTop: 25,
        padding: 10,
        backgroundColor: '#F8CE00'
    },
    packetText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#535353'
    },
    buttonProceed: {
        display: 'flex',
        flexDirection: 'row',
        color: '#000'
    }
});
