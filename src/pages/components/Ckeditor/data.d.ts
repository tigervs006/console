import type { BaseType } from 'antd/lib/typography/Base';

export interface stateData {
  saving: boolean;
  content: string;
  defaultType: BaseType;
  defaultStatus: string;
}
export interface parentProps {
  setContent: (event: any, contents: string) => void;
}
