export interface stateData {
  saving: boolean;
  content: string;
  defaultType: string;
  defaultStatus: string;
}
export interface parentProps {
  dataContent: (event: any, contents: string) => void;
}
