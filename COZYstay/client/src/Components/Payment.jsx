/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const Payment=() => {
  const [cardnumber,setCardnumber]=useState("")
  const [holderName,setHolderName]=useState("")
  const [expirydate,setExpirydate]=useState("")

  const [cvv,setCvv]=useState("")

  const pay=()=>{

    const newcard = {
      cardnumber,
      holderName,
      expirydate,
      cvv
    };

    if (
      !newcard.cardnumber||
      !newcard.holderName||
      !newcard.expirydate||
      !newcard.cvv
    ) {
      alert("Please fill all the fields");
      return;
    }

    Swal.fire("SUCCESS"," Your Payment Successfully", "sucess").then(
      () => (window.location.href = "/profile"));
  }

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <MDBRow className="d-flex align-items-center">
                <MDBCol size="9">
                  <MDBInput
                    label="Card Number"
                    id="form1"
                    type="text"
                    value={cardnumber}
                    onChange={(e) => setCardnumber(e.target.value)}
                    placeholder="1234 5678 9012 3457"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visa"
                    width="64px"
                  />
                </MDBCol>
                
                <MDBCol size="9">
                  <MDBInput
                    label="Cardholder's Name"
                    id="form2"
                    type="text"
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    placeholder="Cardholder's Name"
                  />
                </MDBCol>

                <MDBCol size="6">
                  <MDBInput
                    label="Expiration"
                    id="form2"
                    type="text"
                    value={expirydate}
                    onChange={(e) => setExpirydate(e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="CVV"
                    id="form2"
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="&#9679;&#9679;&#9679;"
                  />
                </MDBCol>
                </MDBRow>
                 <MDBRow>
                <MDBCol size="3">
                 <Button onClick={pay}>
                    Pay
                  </Button>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Payment;
