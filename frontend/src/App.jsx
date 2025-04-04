import { EmployerApp } from "./components/Employer-App"
import { AppContextProvider } from "./context/App-Context"


function App() {
return (
  <>
  <AppContextProvider>
    <EmployerApp/>
  </AppContextProvider>
  </>
)
}

export default App
