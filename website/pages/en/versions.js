/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary');

const Container = CompLibrary.Container;

const CWD = process.cwd();

const siteConfig = require(`${CWD}/siteConfig.js`);
const versions = require(`${CWD}/versions.json`);

function Versions() {
  const latestVersion = versions[0];
  const repoUrl = siteConfig.repoUrl;
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer versionsContainer">
        <div className="post">
          <header className="postHeader">
            <h1>{siteConfig.title} Versions</h1>
          </header>
          <h3 id="latest">Current version (Stable)</h3>
          <p>
            Latest stable version of {siteConfig.title}
          </p>
          <table className="versions">
            <tbody>
              <tr>
                <th>{latestVersion}</th>
                <td>
                  <a href={`${siteConfig.baseUrl || '/'}docs/whatis.html`}>Documentation</a>
                </td>
                <td>
                  <a 
                    target="_blank"
                    href={`https://gitlab.com/ramiel/caravaggio/blob/master/CHANGELOG.md#anchor-${latestVersion.replace(/\./g, '')}`}
                  >Release Notes</a>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="rc">Pre-release versions</h3>
          <p>Here you can find the latest unreleased documentation and code.</p>
          <table className="versions">
            <tbody>
              <tr>
                <th>master</th>
                <td>
                  <a href={`${siteConfig.baseUrl || '/'}docs/next/whatis.html`}>Documentation</a>
                </td>
                <td>
                  <a 
                    target="_blank"
                    href={siteConfig.repoUrl}
                  >Source code</a>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 id="archive">Past Versions</h3>
          <table className="versions">
            <tbody>
              {versions.map(
                version =>
                  version !== latestVersion && (
                    <tr>
                      <th>{version}</th>
                      <td>
                        <a href="">Documentation</a>
                      </td>
                      <td>
                        <a 
                          target="_blank"
                          href={`https://gitlab.com/ramiel/caravaggio/blob/master/CHANGELOG.md#anchor-${version.replace(/\./g, '')}`}
                        >Release Notes</a>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
          <p>
            You can find past versions of this project on{' '}
            <a href={repoUrl}>GitLab</a>.
          </p>
        </div>
      </Container>
    </div>
  );
}

module.exports = Versions;
