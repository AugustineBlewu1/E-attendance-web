import '../style/copyright.css'

export default function Copyright() {
    let style={
        marginRight:"0.5rem",
        

    }

  return (
    <div style={{
        width:"100vw",
        height:'auto',
        backgroundColor:'blue',
        textAlign:"center",
        color:"white",
        padding:'0.1rem 0',
        fontSize:"small"
        

    }}>
      &copy; 2024 <a className='a-link' href="https://sopps.ucc.edu.gh/" target='_blank'>School of Pharmacy and Pharmaceutical Sciences, SoPPS.</a>All right Reserved
      <section style={style}>
      <span  ><a className="a-link" href="https://sopps.ucc.edu.gh/about" target="_blank" >About Us |</a></span>
      <span ><a className="a-link" href="#">Contact Us |</a></span>
      <span ><a className="a-link" href="#">Privacy Policy |</a></span>
      <span ><a className="a-link" href="#">Help</a></span>
      </section>
    </div>
  )
}
