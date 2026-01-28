import { Outlet } from "react-router-dom"
import PublicFooter from "./PublicFooter"
import PublicHeader from "./PublicHeader"

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <main className="w-100" style={{backgroundColor: "white"}}>
        <Outlet />
      </main>
      <PublicFooter />
    </>
  )
}

export default PublicLayout