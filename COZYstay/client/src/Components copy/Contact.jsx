/* eslint-disable no-unused-vars */
import styled from 'styled-components';
import Swal from "sweetalert2";
const Contact=()=>{
  const Wrapper=styled.section`
    paddind:9rem 0 5rem 0

    .container{
      margin-top:6rem;
      text-align:center;
    }

  `;

  function contactSubmit(){
    Swal.fire({
      title: "SUCCESS",
      text: "Thank you for reaching out! Our team has received your message and will respond within 24-48 hours",
      icon: "success",
      timer: 5000, // Show the alert for 3 seconds (3000 milliseconds)
      showConfirmButton: true // Show the "OK" button
    }).then(() => {
      // Redirect to the home page after the alert closes
      window.location.href = '/home';
    });

    // alert("Thank you for reaching out! Our team has received your message and will respond within 24-48 hours.");
    //window.location.href="/home";
  }

  return <>
      <div className="container ">
      <div className='contact-container'>
      <Wrapper>
          <h2 className='contact-heading'>Feel Free to Contact Us</h2>
          <div className='contact-map'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238132.67341503533!2d72.65713293779253!3d21.159440239372824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1725873935960!5m2!1sen!2sin" width="700" height="500" style={{border:0}} allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='map'></iframe>
          </div>
      </Wrapper>
      

      <div className="container">
        <div className="contact-form">
          <form action='#' method='POST' className='contact-inputs'>
              <input type="text" name="username"  autoComplete='off' placeholder='Username'required/><br></br>
              <input type="email" name="email" placeholder="Email" autoComplete='off'  required/><br></br>
              <textarea name="message" cols="30" rows="6" autoComplete='off' placeholder='Type a Message here' required>

              </textarea>

              <button className="btn homebtn mt-3" onClick={contactSubmit}>Submit</button>;
          </form>
        </div>
      </div>
      </div>
      </div>
  </>
}

export default Contact;