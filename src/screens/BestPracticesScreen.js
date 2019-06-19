import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  WebView,
  Platform,
  Linking
} from 'react-native';
import { Container, Button } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import LoginWithAuth0 from '../components/Authentication/loginWithAuth0';
import { AsyncStorage } from 'react-native';
import { setUserCreds } from '../store/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import headerConfig from '../helpers/headerConfig';
import constants from '../helpers/constants';

class BestPracticesScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig('Best Practices', navigation);

  async componentDidMount() {
    // NOTE: TODO check for JWT expiration to confirm if logged in
    let confirmedUser = await AsyncStorage.getItem('auth0Data');

    if (confirmedUser) {
      confirmedUser = JSON.parse(confirmedUser);

      const jwtToken = confirmedUser.params.id_token;
      const decoded = jwtDecode(jwtToken);

      this.props.setUserCreds(decoded, confirmedUser);
    }
  }

  render() {
    console.log('BEST PRACTICES PROPS', this.props);
    return (
      <Container style={styles.container}>
        <SafeAreaView>
          <ScrollView>
            <Text style={{ fontFamily: constants.fontFamily, fontSize: 18 }}>
              Connect Our Kids makes free tools for social workers engaged in
              permanency searches for foster kids. Watch the video below to
              learn more about the free tools and resources in this app.
            </Text>
            <View style={{ height: 300, marginBottom: 30 }}>
              <WebView
                style={styles.WebViewContainer}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: 'https://www.youtube.com/embed/eMivJgf7RNA' }}
              />
            </View>
            <LoginWithAuth0 />
            <Button
              style={styles.button}
              block
              transparent
              onPress={() => this.props.navigation.navigate('PeopleSearch')}
            >
              <Text style={styles.buttonText}>
                People Search - Find Contact Information for Anyone
              </Text>
            </Button>
            <Button
              style={styles.button}
              transparent
              onPress={() =>
                this.props.navigation.navigate('FamilyConnections')
              }
            >
              <Text style={styles.buttonText}>
                Family Connections - Family Trees for Permanency
              </Text>
            </Button>
            <Button
              style={styles.button}
              transparent
              onPress={() => Linking.openURL('https://connectourkids.org')}
            >
              <Text style={styles.buttonText}>
                Resources - Useful Materials and Information
              </Text>
            </Button>
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25
  },

  button: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },

  buttonText: {
    color: constants.highlightColor,
    fontSize: 12,
    textDecorationLine: 'underline'
  },

  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid'
  },

  red: {
    backgroundColor: 'red'
  },

  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0
  }
});

const mapStateToProps = state => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn
  };
};

export default connect(
  mapStateToProps,
  { setUserCreds }
)(BestPracticesScreen);
