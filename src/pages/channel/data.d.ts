export type tableDataItem = {
  pid?: number;
  sort?: number;
  name?: string;
  cname?: string;
  level?: number;
  title?: string;
  banner?: string;
  keywords?: string;
  id?: number | string;
  description?: string;
  ceraet_time?: string;
  status?: number | string;
  children?: tableDataItem[];
};
