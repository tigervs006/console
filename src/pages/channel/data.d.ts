export type tableDataItem = {
  sort?: number;
  path?: string;
  name?: string;
  cname?: string;
  level?: number;
  title?: string;
  banner?: string;
  keywords?: string;
  id?: number | string;
  description?: string;
  ceraet_time?: string;
  pid?: number | number[];
  status?: number | string;
  children?: tableDataItem[];
};
