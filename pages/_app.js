import AuthState from "../context/authState"

function MyApp({ Component, pageProps }) { // el archivo _app.js es el principal, en react puro seria el app.js
   
  return (
            <AuthState>
              <Component {...pageProps} />
            </AuthState>
          )
}

export default MyApp
