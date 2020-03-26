import React, { Fragment, Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
  // this component needed to be changed from func to class component

  // modal component wraps orderSummary component
  // but since modal component is not not always visible
  // we need to edited it, so the nested OrderSummary component
  // isnt updated all the time

  // it should be updated only, when the modal component is shown
  // which means checking the "show" props and changes to it

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  // if the next received props "show" isnt same as current props "show"
  // return true , which means >>> this component should update
  // and all nested components with it

  componentDidUpdate() {
    console.log('modal updated');
  }

  render() {
    return (
      <Fragment>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;
