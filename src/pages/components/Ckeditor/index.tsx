import './index.less';
import React from 'react';
import type { stateData, parentProps } from './data';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class Ckeditor extends React.Component<parentProps, stateData> {
  constructor(props: parentProps) {
    super(props);
    this.state = {
      content: '<h3>Hello from CKEditor5</h3>',
    };
  }
  render() {
    return (
      <CKEditor
        editor={ClassicEditor}
        data={this.state.content}
        // 数据改变时保存
        onChange={(event: any, editor: any) => {
          this.setState({ content: editor.getData() });
        }}
        // 失焦时保存数据
        onBlur={(event: any) => this.props.dataContent(event, this.state.content)}
      />
    );
  }
}
