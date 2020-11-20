import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from 'components/ui/Input';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useDidMount from 'hooks/useDidMount';
import { signUp } from 'redux/actions/authActions';

import CircularProgress from 'components/ui/CircularProgress';
import useScrollTop from 'hooks/useScrollTop';

const SignUp = (props) => {
	const [passwordHidden, setPasswordHidden] = useState(true);

	/* separate states so that when user navigates to signin or forgot password,
	the authStatus message won't display to other routes.
  */
	const [signUpStatus, setSignUpStatus] = useState({});
	const [isSigningUp, setIsSigningUp] = useState(false);
	// ---
	const { isAuthenticating, authStatus } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		authStatus: state.app.authStatus
	}));
	const [field, setField] = useState({});
	const didMount = useDidMount();
	const dispatch = useDispatch();
	const passwordField = useRef(null);

	useScrollTop();
	useDocumentTitle('DG Limpieza | Registro');
	useEffect(() => {
		if (didMount) {
			setSignUpStatus(authStatus);
			setIsSigningUp(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);

	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onFullnameInput = (value, error) => {
		setField({ ...field, fullname: { value, error } });
	};

	const onPasswordInput = (value, error) => {
		setField({ ...field, password: { value, error } });
	};

	const onAddressInput = (value, error) => {
		setField({ ...field, address: { value, error } });
	};

	const onMobileInput = (value, error) => {
		setField({ ...field, mobile: { value, error } });
	};

	const onTogglePasswordVisibility = () => setPasswordHidden(!passwordHidden);

	const onClickSignIn = () => props.history.push('/signin');

	const onFormSubmit = (e) => {
		e.preventDefault();
		const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error);

		if (noError) {
			dispatch(signUp({
				fullname: field.fullname.value.trim(),
				email: field.email.value.trim().toLowerCase(),
				password: field.password.value.trim(),
				address: field.address.value.trim(),
				mobile: field.mobile.value.trim()
			}));
		}
	};
	const isSuccess = !!authStatus.success && authStatus.type === 'auth';

	return (
		<div className="signup">
			{isSuccess && (
				<div className="loader">
					<h3 className="toast-success signin-success">
						{authStatus.message}
						<CircularProgress />
					</h3>
				</div>
			)}
			{signUpStatus.message && (
				<h5 className="text-center toast-error">
					{authStatus.message}
				</h5>
			)}
			{!isSuccess && (
				<>
					<div className={`signup-wrapper ${signUpStatus.message && (!authStatus.success && 'input-error')}`}>
						<h3>Registrarse en DG Limpieza</h3>
						<form onSubmit={onFormSubmit}>
							<div className="signup-field">
								<Input
									field="fullname"
									isRequired
									label="* Nombre Completo"
									maxLength={40}
									onInputChange={onFullnameInput}
									placeholder="Nombre y Apellido"
									readOnly={isSigningUp}
									style={{ textTransform: 'capitalize' }}
									type="text"
								/>
							</div>
							<div className="signup-field">
								<Input
									field="address"
									isRequired
									label="* Dirección"
									maxLength={60}
									onInputChange={onAddressInput}
									placeholder="Domicilio de entrega"
									readOnly={isSigningUp}
									style={{ textTransform: 'capitalize' }}
									type="text"
								/>
							</div>
							<div className="signup-field">
								<Input
									field="mobile"
									isRequired
									label="* Número de Celular"
									maxLength={40}
									onInputChange={onMobileInput}
									placeholder="Solo números"
									readOnly={isSigningUp}
									style={{ textTransform: 'capitalize' }}
									type="number"
								/>
							</div>
							<div className="signup-field">
								<Input
									field="email"
									isRequired
									label="* Email"
									maxLength={40}
									onInputChange={onEmailInput}
									placeholder="test@ejemplo.com"
									readOnly={isSigningUp}
									type="email"
								/>
							</div>
							<div className="signup-field">
								<div style={{ display: 'flex', alignItems: 'flex-end' }} >
									<div style={{ flexGrow: 1 }}>
										<Input
											field="password"
											isRequired
											label="* Contraseña"
											maxLength={40}
											onInputChange={onPasswordInput}
											placeholder="Contraseña"
											readOnly={isSigningUp}
											ref={passwordField}
											style={{ marginBottom: 0 }}
											type={passwordHidden ? 'password' : 'text'}
										/>
									</div>
									<button
										className="button button-small button-muted"
										disabled={isSigningUp}
										onClick={onTogglePasswordVisibility}
										type="button"
									>
										{passwordHidden ? <i className="fa fa-eye" /> : <i className="fa fa-eye-slash" />}
									</button>
								</div>
							</div>
							<br />
							<br />
							<div className="signup-field signup-action">
								<button
									className="btn btn-lg btn-info"
									disabled={isSigningUp}
									type="submit"
								>
									<CircularProgress visible={isSigningUp} theme="light" />
									{isSigningUp ? 'Registrando' : 'Registrarme'}
								</button>
							</div>
						</form>
					</div>
					<div className="signin-message">
						<span className="signin-info">
							<strong>Ya tiene cuenta?</strong>
						</span>
						<button
							className="button button-small button-border button-border-gray"
							disabled={isSigningUp}
							onClick={onClickSignIn}
						>
							Ingresar
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SignUp;
