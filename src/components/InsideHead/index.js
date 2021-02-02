import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';

import styles from './index.module.styl';

class Index extends Component {
  render() {
    const { contentHead } = this.props;
    return (
      <div>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb>
            {contentHead.data.map((item, index) => {
              return (
                <Breadcrumb.Item key={index}>
                  <a href={item.href}>{item.title}</a>
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
          <h3 className={styles.title}>{contentHead.title}</h3>
          <p className={styles.describe}>{contentHead.describe}</p>
        </div>
      </div>
    );
  }
}

export default connect(
  ({ form }) => ({ ...form }),
  ({ form }) => ({ ...form }),
)(Index);
