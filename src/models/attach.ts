/** @format */

import { useState } from 'react';

export default () => {
    const [currentKey, setCurrentKey] = useState<string>('all');
    return { currentKey, setCurrentKey };
};
