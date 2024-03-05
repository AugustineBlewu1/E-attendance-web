

export default function Copyright() {
    let style={
        marginRight:"0.5rem",
        

    }

  return (
    <div className='w-full lg:bg-grey-bg h-auto text-center text-sm absolute bottom-0 text-[6px] md:text-[15px]'>
      &copy; 2024 Copyright <a className='hover:text-primary focus:text-active' href="https://sopps.ucc.edu.gh/" target='_blank'>School of Pharmacy and Pharmaceutical Sciences.</a> All rights Reserved
      <section style={style}>
      <span  ><a className="hover:text-primary focus:text-active" href="https://sopps.ucc.edu.gh/about" target="_blank" >About Us </a> <span> | </span></span>
      <span ><a className=" hover:text-primary focus:text-active " href="#">Contact Us  </a> <span> | </span></span>
      <span ><a className="hover:text-primary focus:text-active " href="#">Privacy Policy  </a> <span> | </span></span>
      <span ><a className=" hover:text-primary focus:text-active " href="#">Help</a></span>
      </section>
    </div>
  )
}
