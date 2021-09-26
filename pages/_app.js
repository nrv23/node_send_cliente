import AuthState from "../context/auth/authState"
import AppState from "../context/app/appState"
import '../styles/Spinner.css'
function MyApp({ Component, pageProps }) { // el archivo _app.js es el principal, en react puro seria el app.js
   
    return (
      <AuthState>
      <AppState>
          <Component {...pageProps} />
        </AppState>
      </AuthState>
    )
}

export default MyApp
