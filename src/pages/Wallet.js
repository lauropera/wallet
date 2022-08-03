import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div className="Wallet-Container">
        <Header />
        <main className="Wallet">
          <WalletForm />
          <Table />
        </main>
      </div>
    );
  }
}

export default Wallet;
