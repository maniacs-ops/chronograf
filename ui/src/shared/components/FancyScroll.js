import React, {PropTypes} from 'react'
import {Scrollbars} from 'react-custom-scrollbars'
import classNames from 'classnames'

const {
  bool,
  node,
  string,
} = PropTypes

const FancyScroll = React.createClass({
  propTypes: {
    isKapacitorTheme: bool,
    scrollBoxClass: string,
    children: node.isRequired,
  },

  render() {
    const {isKapacitorTheme, scrollBoxClass, children} = this.props

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
        {children}
      </Scrollbars>
    )
  },
})

FancyScroll.defaultProps = {
  isKapacitorTheme: false,
  scrollBoxClass: 'fancy-scroll-container',
}

export default FancyScroll