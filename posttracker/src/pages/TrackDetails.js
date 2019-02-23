import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import PackageUpdate from '../components/PackageUpdate';

const TrackDetails = props => {

    const {
        trackDetails: { data },
    } = props.navigation.state.params;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Postado em:</Text>
                <Text style={styles.value}>{data.postedAt}</Text>
            </View>
            <View>
                <Text style={styles.title}>Ultima atualização:</Text>
                <Text style={styles.value}>{data.updatedAt}</Text>
            </View>
            <View>
                <Text style={styles.title}>Entregue:</Text>
                <Text style={styles.value}>{data.isDelivered ? "SIM" : "NÃO"}</Text>
            </View>
            <View>
                <Text style={styles.title}>Histórico de atualizações</Text>
            </View>

            <FlatList
                data={data.track}
                keyExtractor={update => update.trackedAt}
                renderItem={({ item }) => <PackageUpdate update={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 5,
        borderColor: "#eee"
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    value: {
        fontSize: 14
    }
});

TrackDetails.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.trackCode.toUpperCase()
});

export default TrackDetails;
