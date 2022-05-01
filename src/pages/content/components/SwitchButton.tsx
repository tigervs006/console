import React from 'react';
import { Switch } from 'antd';
import PropTypes from 'prop-types'

class SwitchButton extends React.Component{
  constructor(props: any) {
    super(props)
    this.state = {
      loading: true,
      message: "我是子组件的message",
    }
  }
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  }
  render() {
    return (
      // @ts-ignore
      <Switch key="id" loading={this.state.loading} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={!!status} />
    )
  }
}

export default SwitchButton;
