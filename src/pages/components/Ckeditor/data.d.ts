export interface stateData {
  saving: boolean;
  content: string;
  defaultType: string;
  defaultStatus: string;
}
export interface parentProps {
  setContent: (event: any, contents: string) => void;
}
