import React, { useState, useRef, useEffect } from 'react'

import { Register } from '../../../APIArmy/Register/RegisterUser'

import { Button, Col, Form, FormCheck, Row } from 'react-bootstrap';
import SwalFire from '../../../Helper/SwalFire'

const CompanyForm = () => {

    const taxIdInputRef = useRef();
    const companyNameInputRef = useRef();
    const emailInputRef = useRef();
    const addressInputRef = useRef();
    const telephoneInputRef = useRef();

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log('component mounted')
        let mounted = true;

        return () => mounted = false;

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            // สั่งให้ validated ทำงาน
            setValidated(true);
            return;
        }

        let requestObject = {
            taxID: taxIdInputRef.current.value,
            companyName: companyNameInputRef.current.value,
            email: emailInputRef.current.value,
            address: addressInputRef.current.value,
            telephone: telephoneInputRef.current.value
        }

        Register.RegisterCompanyUser({ ...requestObject }).then(async (res) => {
            if (res?.isSuccess) {
                await SwalFire("Register Success", true)
                taxIdInputRef.current.value = ''
                companyNameInputRef.current.value = ''
                emailInputRef.current.value = ''
                addressInputRef.current.value = ''
                telephoneInputRef.current.value = ''

                setValidated(false);
            }
        });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} disabled>
            {/* Tax ID & Company Name */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="taxId">
                    <Form.Label>Tax ID:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={taxIdInputRef} maxLength={20} required
                        onKeyDown={(e) => {
                            // ไม่ใช่ตัวเลขและไม่ใช่ Backspace ไม่ให้พิมพ์
                            if (!/[0-9]/.test(e.key) && !(e.key === 'Backspace')) {
                                e.preventDefault();
                            }
                        }} />
                    <Form.Control.Feedback type="invalid">Please Input Tax ID</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="companyNameId">
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={companyNameInputRef} maxLength={50} required />
                    <Form.Control.Feedback type="invalid">Please Input Company Name</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Email & Address */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="emailId">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control as="input" type="email" className='disabled-valid-style' ref={emailInputRef} maxLength={20} required />
                    <Form.Control.Feedback type="invalid">Please Input Email</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="addressId">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={addressInputRef} maxLength={150} required />
                    <Form.Control.Feedback type="invalid">Please Input Address</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Telephone */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="telephone">
                    <Form.Label>Telephone:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={telephoneInputRef} maxLength={15} required
                        onKeyDown={(e) => {
                            // ไม่ใช่ตัวเลขและไม่ใช่ Backspace ไม่ให้พิมพ์
                            if (!/[0-9]/.test(e.key) && !(e.key === 'Backspace')) {
                                e.preventDefault();
                            }
                        }} />
                    <Form.Control.Feedback type="invalid">Please Input Telephone</Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Button type="submit" id="save" name="save" value="save" className="mt-2 mb-2 btn btn-primary" style={{ width: 'auto', minWidth: 140 }}>Save</Button>
        </Form>
    )
}


export default CompanyForm;