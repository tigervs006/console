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
