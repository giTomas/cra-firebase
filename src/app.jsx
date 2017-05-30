import React from 'react';
import firebase from 'firebase';
// import reactfire from 'reactfire';

const config = {
  apiKey: "AIzaSyCGMtZxOIDr5rpHutJ7WirMurPam5HL6fk",
  authDomain: "crc-firebase.firebaseapp.com",
  databaseURL: "https://crc-firebase.firebaseio.com",
  projectId: "crc-firebase",
  storageBucket: "crc-firebase.appspot.com",
  messagingSenderId: "439994884617"
};
firebase.initializeApp(config);
// const App = () => (
//   <div>Hello app</div>
// );


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
    }
  }

  componentWillMount() {
    this.firebaseRef = firebase.database().ref('data/items');
  }

  // FP????????
  componentDidMount() {
    this.firebaseRef.on('value', dataSnapshot => {
      let items = [];
      // for each will loop throught database
      dataSnapshot.forEach(childSnapshot => {
        // get entry in database
        const item = childSnapshot.val();
        item['_key'] = childSnapshot.key;
        items.push(item);
      })
      this.setState({
        items,
      });
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off();
  }

  handleChange = (e) => {
      this.setState({text: e.target.value})
  };

  pushToFirebase = (e) => {
    e.preventDefault();
    this.firebaseRef.push({text: this.state.text});
    this.setState({text: ''});
  }

  render() {
    const { items } = this.state;
    console.log(items)
    const records = items.map((item) => <li key={item._key}>{item.text}</li>);
    return (
      <div>
         <input onChange={this.handleChange} />
         <button onClick={this.pushToFirebase}>Push to Firebase</button>
         <ul>
           {records || <p>Loading...</p>}
         </ul>
      </div>
    )
  }
};

export default App;
