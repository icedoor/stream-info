import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('ok on successful fetch status code 200', () => {
  let test = fetch('https://httpstat.us/200')
  .then(App.handleResponse)
  .then(_ => {return true})
  .catch(_ => {return false})

  return test.then(res => expect(res).toBe(true))
});

it('ok on successful fetch status code 206', () => {
  let test = fetch('https://httpstat.us/206')
  .then(App.handleResponse)
  .then(_ => {return true})
  .catch(_ => {return false})

  return test.then(res => expect(res).toBe(true))
});

it('errors on unsuccessful fetch status code 300', () => {
  let test = fetch('https://httpstat.us/300')
  .then(App.handleResponse)
  .then(_ => {return null})
  .catch(e => {return e})

  return test.then(res => expect(res).toEqual(new Error('Multiple Choices')))
});

it('errors on unsuccessful fetch status code 400', () => {
  let test = fetch('https://httpstat.us/400')
  .then(App.handleResponse)
  .then(_ => {return null})
  .catch(e => {return e})

  return test.then(res => expect(res).toEqual(new Error('Bad Request')))
});

it('errors on unsuccessful fetch status code 500', () => {
  let test = fetch('https://httpstat.us/500')
  .then(App.handleResponse)
  .then(_ => {return null})
  .catch(e => {return e})

  return test.then(res => expect(res).toEqual(new Error('Internal Server Error')))
});