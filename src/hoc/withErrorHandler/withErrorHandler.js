import React, { Fragment, Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  // we are returning an anonymous class
  // we are not using it here, we are just returning it
  // its basically class factory (like action creator)
  return class extends Component {
    state = {
      error: null
    };

    // this was changed from didMount to willMount
    // because fetching data change
    // it needs to be set up before didMounts in child components
    // and thats possible only with willMount
    // or we can do this in constructor
    componentWillMount() {
      // first argument is function for request
      // here we are just reseting the "error state"
      // just to make sure it will be null for the response part
      // and at the end we need to return the request so it can continue

      // in the last module video we stored the axios in the component property
      // it holds the reference to the axios
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      // first argument is function for response
      // we are setting the state when getting an error from the response
      // the error argument is an object - has message prop, so we can console log it later
      // and also in the first argument res=>res we are returning the response so it can continue
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    // here we are getting rid of the useless interceptors
    componentWillUnmount() {
      // console.log('will Unmount', this.reqInterceptor, this.resInterceptor)
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;

// so the "show prop" in modal component will be true only
// if the "error state" will not be null
// when we set it, the state will hold the "error object",
// so we can output the message prop from it in the modal component

// we also need to check the cancelation of the errorModal
// aka the backdrop click, that is handled by "modalClosed" prop
// in that we are sending reference to the method which is closing
// the modal

// regarding showing the error message
// the modal is "always present" and the "erros state" can be null
// so this.state.error.message could throw an error
// that why we need another condition only for the message
