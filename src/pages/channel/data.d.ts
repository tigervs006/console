export type tableDataItem = {
  id?: number;
  pid: number;
  sort: number;
  level: number;
  status: number;
  name: string;
  cname: string;
  title: string;
  keywords: string;
  description: string;
  banner?: string;
  ceraet_time: string;
  children?: string[];
};
