import React, {PropTypes} from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import classNames from 'classnames'

const {
  bool,
  string
} = PropTypes

const FancyScroll = React.createClass({
  propTypes: {
    isKapacitorTheme: bool,
    scrollBoxClass: string,
  },

  render() {
    const {scrollBoxClass, isKapacitorTheme} = this.props

    return (
      <Scrollbars
        autoHide={true}
        autoHideTimeout={500}
        autoHideDuration={250}
        renderTrackVertical={props => <div {...props} className={classNames("fancy-track-vertical", {"fancy-kapacitor": isKapacitorTheme})}/>}
        renderThumbVertical={props => <div {...props} className={classNames("fancy-thumb-vertical", {"fancy-kapacitor": isKapacitorTheme})}/>}
        renderTrackHorizontal={props => <div {...props} className={classNames("fancy-track-horizontal", {"fancy-kapacitor": isKapacitorTheme})}/>}
        renderThumbHorizontal={props => <div {...props} className={classNames("fancy-thumb-horizontal", {"fancy-kapacitor": isKapacitorTheme})}/>}
        className={scrollBoxClass}
      >
        {this.props.children}
      </Scrollbars>
    )
  },
}

export default FancyScroll