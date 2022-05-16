import type { BaseType } from 'antd/lib/typography/Base';

export interface stateData {
  saving: boolean;
  content: string;
  defaultType: BaseType;
  defaultStatus: string;
}
export interface parentProps {
  content?: string;
  setContent: (contents: string) => void;
}
