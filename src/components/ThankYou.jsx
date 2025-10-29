import { Link } from "react-router-dom"

const ThankYou = () => {
  return (
    <div className='thank-you'>
      <h1>Thank you for subscribing!</h1>
      <p>You'll now receive updates and job alerts directly in your inbox.</p>
      <Link to="/">Back to home</Link>
    </div>
  )
}

export default ThankYou
