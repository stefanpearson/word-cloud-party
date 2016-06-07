# Word Cloud Party

An interactive word-cloud of topics, displaying engagement volume and sentiment. A demo is available [here](https://word-cloud-party.herokuapp.com).

## Design decisions

#### Server

* Server app is responsible for serving both the client assets and REST API

#### Client

* React app handles client-side rendering with a clean component heirarchy
* Flux architecture takes care of application actions and object stores using [Alt](http://alt.js.org)
* HTML uses [BEM](https://en.bem.info/methodology/key-concepts/) for sane namespacing
* Sass split into BEM components
* Components components components

## Installation

```sh
npm install
```

### Environment variables

…

### Running

To run the build and express server:

```sh
npm start
```

Should you need to watch the Sass & client-side JS during development:

```sh
npm run dev
```

## To do ⏱

* Client testing for React components 😇
* Animation when state changes
* Show detail in flyout menu for small-screen displays
* Isomorphic rendering on the server
