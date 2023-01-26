import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface State {
	tarhelyek: Tarhely[];
	id: number;
	nev: string;
	meret: number;
	ar: number;
  }
  
  interface Tarhely {
	nev: string;
	meret: number;
	ar: number;
  }
  

interface TarhelyListResponse {
  tarhelyek: Tarhely[];
}


class App extends Component<{}, State> {

  constructor(props: {}) {
    super(props);

    this.state = {
      id: 0,
      nev: '',
      meret: 0,
	  ar: 0,
      tarhelyek: [],
    }
  }

  async loadTarhelyek() {
    let response = await fetch('http://localhost:3000/api/tarhely');
    let data = await response.json() as TarhelyListResponse;
    this.setState({
      tarhelyek: data.tarhelyek,
    })
  }

  componentDidMount() {
    this.loadTarhelyek();
  }

//   handleRegister = async () => {
//     const { nev, meret, ar } = this.state;
    // if (nev.trim() === '' || regPass !== regPass2) {
    //   // this.setState() -tel hibaüzenet megjelenítése
    //   return;
    // }

    const adat = {
      username: regUser,
      password: regPass,
    };

    let response = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adat),
    });

    // this.setState({
    //   regUser: '',
    //   regPass: '',
    //   regPass2: '',
    // })

    await this.loadTarhelyek();
//   };

  render() {
    const { nev, meret, ar } = this.state;

	return this.state;
    // return <div>
    //   <h2>Új user</h2>
    //   User: <input type='text' value={regUser} onChange={e => this.setState({ regUser: e.currentTarget.value })} /><br/>
    //   Jelszó: <input type='password' value={regPass} onChange={e => this.setState({ regPass: e.currentTarget.value })} /><br />
    //   Jelszó ismét: <input type='password' value={regPass2} onChange={e => this.setState({ regPass2: e.currentTarget.value })} /><br />
    //   <button onClick={this.handleRegister}>Regisztráció</button>
    //   <h2>Userek listája</h2>
    //   <ul>
    //     {
    //       this.state.users.map(user => <li>{user.username}</li>)
    //     }
    //   </ul>
    // </div>;
  }
}


export default App;
