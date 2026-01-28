import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


const Layout = () => {
  return (
    <>
      <Header />

      <main className="w-100">
        <div className="w-100 d-flex justify-content-center mb-5">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout