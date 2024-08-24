import styles from './registration.module.css'
import { useState, useRef } from 'react'


const originalState = {
	email: '',
	password: '',
	removePassword: '',
}

const useStore = () => {
	const [state, setState] = useState(originalState)

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue })
		}
	}
}

const gettingTheForm = (forms) => {
	console.log(forms)
}

function App() {
	const { getState, updateState } = useStore()
	const [pasError, setPasError] = useState(null)

	const submitButtonRef = useRef(null)

	const onSubmit = (event) => {
		event.preventDefault()
		gettingTheForm(getState())
	}

	const { email, password, removePassword } = getState()

	const onChange = ({ target }) => {
		updateState(target.name, target.value)
	}

	const onChangePassword = ({ target }) => {
		updateState(target.name, target.value)

		let error = null

		if (!/^[\w_]*$/.test(target.value)) {
			error = 'Неверный пароль. Допустимы символы - буквы, цифры и нижнее подчеркивание '
		} else if (target.value.length > 15) {
			error = 'Длинный пароль. Должно быть не больше 15 символов'
		}

		setPasError(error)

		if (removePassword.length === 10) {
			submitButtonRef.current.focus()
		}
	}

	const onPasswordBlur = () => {
		if (password.length < 3) {
			setPasError('Неверный пароль. Пароль должен быть больше 3 символов')
		} else if (password !== removePassword) {
			setPasError('ошибка')
		}
	}

	const onRemoveBlur = () => {
		if (removePassword.length < 3) {
			setPasError('Неверный пароль. Пароль должен быть больше 3 символов')
		} else if (password !== removePassword) {
			setPasError('ошибка')
		}
	}

	const onBlur = () => {
		if (!/^[\w@.]*$/.test(email)) {
			setPasError('Email должен содержать буквы, цифры, @ и точку')
		}
	}

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				{pasError && <b><div className={styles.passwordError}>{pasError}</div></b>}
				<input className={styles.input}
					type="email"
					name="email"
					value={email}
					placeholder="Почта"
					onChange={onChange}
					onBlur={onBlur}
				/>
				<input className={styles.input}
					type="password"
					name="password"
					value={password}
					placeholder="Пароль"
					onChange={onChangePassword}
					onBlur={onPasswordBlur}
				/>
				<input className={styles.input}
					type="password"
					name="removePassword"
					value={removePassword}
					placeholder="Повторите пароль"
					onChange={onChangePassword}
					onBlur={onRemoveBlur}
				/>
				<button ref={submitButtonRef} className={styles.button} type="submit" disabled={pasError !== null}>Зарегистрироваться</button>
			</form>
		</div>
	)
}

export default App;
