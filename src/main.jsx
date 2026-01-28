import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { Provider } from 'react-redux'
import { store } from './app/store.js'

import { HashRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path='/*' element={<App />} />
      </Routes>
    </HashRouter>
  </Provider>
)
