/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2022. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import React from 'react';
import styles from './index.less';

export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
};

const Field: React.FC<FieldProps> = ({ label, value, ...rest }) => (
  <div className={styles.field} {...rest}>
    <span className={styles.label}>{label}</span>
    <span className={styles.number}>{value}</span>
  </div>
);

export default Field;
