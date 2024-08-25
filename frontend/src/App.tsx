import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {request} from "./api/request.ts";
import {APIResponse} from "./types/response.ts";

function App() {
  const [creditCard, setCreditCard] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [additionalData, setAdditionalData] = useState<string>("");

  const validateCC = async () => {
    if (!creditCard) {
      return;
    }
    setLoading(true);
    const response: APIResponse = await request('/validate/cc', {creditCard}, 'POST');
    setIsValid(response.isValid || false);
    setAdditionalData(response.error || "");
    setLoading(false);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo"/>
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>
      <h1>Credit Card Validation</h1>
      <div className="card">
        <label htmlFor="label--cc" className="cc-input">Credit Card Number:</label>
        <input
          id="input--cc"
          data-testid="input-cc"
          type="text"
          onChange={(e) => setCreditCard(e.target.value)}
          value={creditCard}
          className="input--cc"
        />
        <button
          data-testid="button-validate-cc"
          className="button"
          onClick={() => validateCC()}
          disabled={loading}
        >
          {!loading ? 'Validate Credit Card' : 'Validating...'}
        </button>
      </div>
      <p className="p--valid-card">
        {!loading && isValid ? 'VALID CARD NUMBER' : 'INVALID CARD NUMBER' /*""*/}
      </p>
      <p>{additionalData}</p>
    </>
  )
}

export default App
