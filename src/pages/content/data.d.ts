import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export type authorData = {
  name: string;
  cname: string
};

export type statusData = {
  id: number
  status: number
}

export type valueEnumData = {
  [key: string]: {
    text: string
    status: string
  }
}
