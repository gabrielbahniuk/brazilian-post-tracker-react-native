import React, { Component } from 'react';
import api from '../services/api';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Reactotron from 'reactotron-react-native';
// import styles from './styles';

console.tron = Reactotron.configure()
    .useReactNative()
    .connect();

export default class HomePage extends Component {
    state = {
        trackCode: '',
        trackDetails: {}
    };

    static navigationOptions = () => ({
        title: 'Package Tracker'
    });

    handleSearch = async () => {
        const { trackCode } = this.state;

        if (!trackCode.length) return;

        const response = await api.get(`/track/${trackCode}/json`);

        this.setState({ trackDetails: response.data });

        const { trackDetails } = this.state;

        this.props.navigation.navigate('TrackDetails', {
            trackCode,
            trackDetails
        });
    };

    handleInputChange = trackCode => this.setState({ trackCode });

    render() {
        return (
            <View>
                <TextInput
                    onChangeText={this.handleInputChange}
                    placeholder="Inform the track code, e.g. AA100833276BR"
                    value={this.state.trackCode}
                    returnKeyType="send"
                    onSubmitEditing={this.handleSearch}
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={this.handleSearch}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15,
        alignSelf: 'stretch',
        marginTop: 30
    },
    button: {
        height: 44,
        alignSelf: 'stretch',
        marginTop: 10,
        backgroundColor: '#F8CE00',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
