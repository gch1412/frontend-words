const Error = ({ error }) => {
  return (
    <div className="vh-75 w-100">
      <p>{error.code} - {error.message}</p>
    </div>
  )
}

export default Error