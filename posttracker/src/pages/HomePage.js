import React, { Component } from 'react';

import Packet from '../components/Packet';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    FlatList
} from 'react-native';
import Reactotron from 'reactotron-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import styles from './styles';

console.tron = Reactotron.configure()
    .useReactNative()
    .connect();

export default class HomePage extends Component {
    static navigationOptions = () => ({
        title: 'Package Tracker'
    });
    state = {
        trackCode: '',
        trackedPackages: [],
        trackDetails: {}
    };

    async componentDidMount() {
        const packages = JSON.parse(
            await AsyncStorage.getItem('@posttracker:trackcodeList')
        );
        if (!packages) return;

        await this.setState({ trackedPackages: packages });
    }

    handleAddPackage = async () => {
        const { trackCode } = this.state;

        if (!trackCode.length) return;

        await this.setState({
            trackedPackages: [...this.state.trackedPackages, trackCode]
        });

        await AsyncStorage.setItem(
            '@posttracker:trackcodeList',
            JSON.stringify(this.state.trackedPackages)
        );
    };

    handleInputChange = trackCode => this.setState({ trackCode });

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <TextInput
                        onChangeText={this.handleInputChange}
                        placeholder="Inform the track code, e.g. AA100833276BR"
                        value={this.state.trackCode}
                        returnKeyType="send"
                        onSubmitEditing={this.handleAddPackage}
                        style={styles.input}
                    />
                    <TouchableOpacity
                        onPress={this.handleAddPackage}
                        style={styles.button}
                    >
                        <Icon
                            name="add-circle-outline"
                            size={36}
                            color="#535353"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerPackages}>
                    <Text style={styles.textTitle}>My Packages</Text>
                    <FlatList
                        data={this.state.trackedPackages}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <Packet
                                navigation={this.props.navigation}
                                trackCode={item}
                            />
                        )}
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
        marginTop: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        height: 44,
        paddingHorizontal: 15
    },
    button: {
        minWidth: 30,
        marginLeft: 5
    },
    containerPackages: {
        marginTop: 10,
        marginBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    textTitle: {
        color: '#535353',
        fontSize: 22,
        fontWeight: 'bold'
    }
});
