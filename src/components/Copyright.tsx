

export default function Copyright() {
    let style={
        marginRight:"0.5rem",
        

    }

    const link = [
      {name:'About',href:'https://sopps.ucc.edu.gh/about'},
      {name:'Contact Us',href:'https://sopps.ucc.edu.gh/about'},
      {name:'Privacy Policy',href:'#'},
      {name:'Help',href:'#'}
    ]

  return (
    <div className='w-full lg:bg-grey-bg h-auto text-center text-sm absolute bottom-0 text-[6px] md:text-[15px]'>
      &copy; 2024 Copyright <a className='hover:text-[#2E3094] focus:text-[#ed1b24]' href="https://sopps.ucc.edu.gh/" target='_blank'>School of Pharmacy and Pharmaceutical Sciences.</a> All rights Reserved
      <section style={style}>
        {
            link.map((item)=>{
              return(
              <span key={item.name} ><a className="hover:text-[#2E3094] focus:text-[#ed1b24]" href={item.href} target="_blank" >{item.name} </a> <span> | </span></span>
              )
            })
        }
     
      </section>
    </div>
  )
}
