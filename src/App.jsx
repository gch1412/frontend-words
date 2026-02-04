import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Routes, Route } from 'react-router-dom'
import LandPage from './components/LandPage'
import WordsHome from './features/words/WordsHome'
import Login from './features/auth/Login'
import SignUp from './features/auth/SignUp'
import WordsMenu from './features/words/WordsMenu'
import Words from './features/words/Words'
import Layout from './components/Layout';
import AddWord from './features/words/AddWord'
import EditWord from './features/words/EditWord'
import Settings from './components/Settings';
import About from './components/About';
import Prefetch from './features/auth/Prefetch';
import PublicLayout from './components/PublicLayout';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path='/home' element={<WordsHome />} />
            <Route path='/words'>
              <Route index element={<WordsMenu />} />
              <Route path=':category' element={<Words />} />
              <Route element={<Prefetch />}>
                <Route path=':category/:id' element={<EditWord />} />
              </Route>
            </Route>
            <Route path='lessons'>
            </Route>
            <Route path='/add_word' element={<AddWord />} />
            <Route path='/about' element={<About />} />
            <Route path='/settings' element={<Settings />} />
          </Route>
        </Route>
      </Route>

    </Routes>
  )
}

export default App
