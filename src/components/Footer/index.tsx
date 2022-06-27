/** @format */

import React from 'react';
import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
    const intl = useIntl();
    const defaultMessage = intl.formatMessage({
        id: 'app.copyright.produced',
        defaultMessage: '北蓝得（深圳）科技有限公司 Copyright ©2022 All Rights Reserved',
    });

    const currentYear = new Date().getFullYear();

    return (
        <DefaultFooter
            copyright={`${currentYear} ${defaultMessage}`}
            links={[
                {
                    key: '田者高拍官网',
                    title: '田者高拍',
                    href: 'https://www.brandsz.cn',
                    blankTarget: true,
                },
                {
                    key: '|',
                    title: '|',
                    href: 'javascrip:',
                },
                {
                    key: '如虎科技官网',
                    title: '如虎科技',
                    href: 'https://www.tigervs.com',
                    blankTarget: true,
                },
            ]}
        />
    );
};

export default Footer;
