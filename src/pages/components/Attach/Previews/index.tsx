/** @format */

import '../index.less';
import React from 'react';
import { useModel } from 'umi';
import { Typography } from 'antd';

export const Previews: React.FC = () => {
    const { Link } = Typography;
    const { currentKey } = useModel('attach', ret => ({
        currentKey: ret.currentKey,
    }));

    return <Link>Current selected === {currentKey}</Link>;
};
