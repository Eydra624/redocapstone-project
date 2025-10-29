import girlpointer from "../assets/girlpointer.png"


const Hero = () => {

  return (
    <div className="hero-sec">

    <div className="left">
    <h1>Looking for your <span style={{color: "yellow"}}>Dream</span> job?</h1>
    <h3>Thousands of fresh openings updated daily, apply and get hired fast.</h3>
    <h4><em>Start your search here today!</em></h4>
    </div>
    
    <div className="right">
    <img src={girlpointer} alt="" />
    </div>

    </div>
     )
}

export default Hero
