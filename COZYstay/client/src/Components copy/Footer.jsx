const Footer=()=>{

  return <>
{/* <!-- Remove the container if you want to extend the Footer to full width. --> */}
<div class="container my-5">

  <footer style={{backgroundColor:" #eee6d3;"}}>
    <div class="container p-4">
      <div class="row">
        <div class="col-lg-6 col-md-12 mb-4">
          <h5 class="mb-3 text-dark">About HotelBooking</h5>
          <p>
          At HotelBooking, we strive to provide travelers with a seamless and reliable platform for finding the perfect stay, whether you're on a family vacation, a business trip, or a solo adventure. Our easy-to-use website offers a wide range of accommodations, from luxurious hotels to cozy boutique stays, ensuring that every guest finds the ideal place to rest. We’re dedicated to making your booking experience hassle-free with competitive pricing, detailed listings, and 24/7 customer support. With HotelBooking, your comfort is our priority.
          </p>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="mb-3 text-dark">links</h5>
          <ul class="list-unstyled mb-0">
            <li class="mb-1">
              <a href="#!"  className="footerLink">FAQ</a>
            </li>
            <li class="mb-1">
              <a href="#!" className="footerLink">Classes</a>
            </li>
            <li class="mb-1">
              <a href="#!" className="footerLink">Pricing</a>
            </li>
            <li>
              <a href="#!" className="footerLink">Safety</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="mb-1 text-dark">opening hours</h5>
          <table class="table" style={{borderColor: "#666;"}}>
            <tbody>
              <tr>
                <td>Mon - Fri:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Sat - Sun:</td>
                <td>8am - 1am</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2);"}}>
      © 2020 Copyright:
      <a class="text-dark" href="https://mdbootstrap.com/" className="footerLink">MDBootstrap.com</a>
    </div>
    {/* <!-- Copyright --> */}
  </footer>
  
</div>
  </>
}

export default Footer;