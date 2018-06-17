'use strict';

function runTransaction() {
const address = document.getElementById("sender").value;
const secret = document.getElementById("secret").value;
const destination = document.getElementById("destination").value;
const amount = document.getElementById("amount").value;

String("sender");
String("secret");
String("destination");
String("amount");

const instructions = {maxLedgerVersionOffset: 5};

const payment = {
  source: {
    address: address,
    maxAmount: {
      value: amount,
      currency: 'XRP'
    }
  },
  destination: {
    address: destination,
    amount: {
      value: amount,
      currency: 'XRP'
    }
  }
};

function quit(message) {
  console.log(message);
  process.exit(0);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}

api.connect().then(() => {
  console.log('Connected...');
  return api.preparePayment(address, payment, instructions).then(prepared => {
    console.log('Payment transaction prepared...');
    const {signedTransaction} = api.sign(prepared.txJSON, secret);
    console.log('Payment transaction signed...');
    api.submit(signedTransaction).then(quit, fail);
  });
}).catch(fail);
}
