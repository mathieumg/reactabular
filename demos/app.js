'use strict';

require('../css/style.css');

var React = require('react');

var FullTable = require('./full/table.jsx');


var App = React.createClass({
    render() {
        return <div>
            <a href='https://github.com/bebraw/reactabular'>
                <img
                    className='github-fork'
                    src='https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67'
                    alt='Fork me on GitHub'
                    data-canonical-src='https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png'></img>
            </a>
            <header>
                <h1>Reactabular</h1>

                <div className='description'>Spectacular tables for React.js</div>
            </header>
            <article>
                <FullTable></FullTable>
            </article>
        </div>;
    },
});

module.exports = App;