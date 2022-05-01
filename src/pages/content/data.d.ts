import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export type author = {
  name: string;
  cname: string
};

export type status = {
  id: number
  status: number
}

export type valueEnum = {
  [key: string]: {
    text: string
    status: string
  }
}
