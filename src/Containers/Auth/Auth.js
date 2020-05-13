import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { auth, setAuthRedirectPath } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    AuthForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSethAuthRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({ isSignUp: !prevState.isSignUp }));
  };

  submitHandler = (event) => {
    event.preventDefault();

    let authData = {};

    for (let key in this.state.AuthForm) {
      authData[key] = this.state.AuthForm[key].value;
    }

    this.props.onAuth(authData.email, authData.password, this.state.isSignUp);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    let eventValue = event.target.value;

    this.setState((state) => ({
      ...state,
      AuthForm: {
        ...state.AuthForm,
        [inputIdentifier]: {
          ...state.AuthForm[inputIdentifier],
          value: eventValue,
          valid: checkValidity(
            eventValue,
            state.AuthForm[inputIdentifier].validation
          ),
          touched: true,
        },
      },
    }));
  };

  render() {
    let authFormElementsArray = [];
    for (let key in this.state.AuthForm) {
      authFormElementsArray.push({
        id: key,
        config: this.state.AuthForm[key],
      });
    }

    let form = authFormElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        touched={formElement.config.touched}
        valid={formElement.config.valid}
        shouldValidate={formElement.config.validation}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));

    let signUpOrSignIn = this.state.isSignUp ? 'SIGN IN' : 'SIGN UP';

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = this.props.error ? (
      <p>{this.props.error.message}</p>
    ) : null;

    let ifAuthenticatedRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;
    return (
      <div className={classes.AuthForm}>
        {ifAuthenticatedRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {signUpOrSignIn}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.userId != null,
  buildingBurger: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(auth(email, password, isSignup)),
  onSethAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
