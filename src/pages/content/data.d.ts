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

export type tableDataItem = {
  id: number
  cid: number
  click: number
  title: string
  status: number
  author: string
  channel: {
    id: number
    name: string
    cname: string
  }
  is_head: number
  is_recom: number
  loading?: boolean
  is_collect: number
  create_time: string
  update_time: string
}
