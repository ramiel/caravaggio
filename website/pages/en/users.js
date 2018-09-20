/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + '/siteConfig.js');

class Users extends React.Component {
  render() {
    const showcase = siteConfig.users.map((user, i) => {
      return (
        <a href={user.infoLink} key={user.infoLink} target="_blank">
          <img src={user.image} title={user.caption} />
        </a>
      );
    });

    const hasUsers = siteConfig.users && siteConfig.users.length > 0;

    return (
      <div className="mainContainer">
        <Container padding={['bottom', 'top']}>
          <div className="showcaseSection">
            {
              hasUsers
              ? (<div>
                  <div className="prose">
                    <h1>Who's using Caravaggio?</h1>
                  </div>
                  <div className="logos">{showcase}</div>
              </div>)
            : null
            }
            
            <div className="prose" style={{marginTop: hasUsers ? '15em' : 'auto' }}>
              <p>Are you using this project?</p>
            </div>
            <a
              target="_blank"
              href="mailto:fabrizio.ruggeri@gmail.com?subject=I'm using Caravaggio&body=Please tell us about your company"
              className="button">
              Add your company
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Users;
