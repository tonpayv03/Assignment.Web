import React, { useState, useRef, useEffect } from 'react'

import DateFnsUtils from '@date-io/date-fns';
import { Register } from '../../../APIArmy/Register/RegisterUser'

import { Button, Col, Form, Row } from 'react-bootstrap';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IconButton, InputAdornment } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import SwalFire from '../../../Helper/SwalFire'

const PersonForm = ({ onChangeTabCallback }) => {

    const cardIdInputRef = useRef();
    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const conpanySelectRef = useRef();
    const emailInputRef = useRef();
    const addressInputRef = useRef();
    const telephoneInputRef = useRef();

    const [companies, setCompanies] = useState([])
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [isInvalidDateOfbirth, setIsInvalidDateOfbirth] = useState(false);
    const [validated, setValidated] = useState(false);

    useEffect(() => {
        console.log('component mounted')
        let mounted = true;
        Register.GetCompaniesChoice().then(async (res) => {
            if (mounted) {
                
                if (res?.isSuccess) {
                    setCompanies(res.companies);
                }
                else if (res?.statusCode === 404) {
                    await SwalFire("Company not found, Please add Company information before making a transaction.")
                    onChangeTabCallback();
                }
            }
        });

        return () => mounted = false;

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            // สั่งให้ validated ทำงาน
            setValidated(true);
            if (!dateOfBirth) {
                setIsInvalidDateOfbirth(true)
            }
            return;
        }

        let requestObject = {
            cardID: cardIdInputRef.current.value,
            dateOfBirth: dateOfBirth,
            name: nameInputRef.current.value,
            surname: surnameInputRef.current.value,
            companyId: conpanySelectRef.current.value,
            email: emailInputRef.current.value,
            address: addressInputRef.current.value,
            telephone: telephoneInputRef.current.value
        }

        Register.RegisterPersonUser({ ...requestObject }).then(async (res) => {
            if (res?.isSuccess) {
                await SwalFire("Register Success", true)
                cardIdInputRef.current.value = ''
                setDateOfBirth(null)
                nameInputRef.current.value = ''
                surnameInputRef.current.value = ''
                conpanySelectRef.current.value = ''
                emailInputRef.current.value = ''
                addressInputRef.current.value = ''
                telephoneInputRef.current.value = ''

                setValidated(false);
            }
        });
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit} disabled>
            {/* Card ID & Date of Birth */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="cardId">
                    <Form.Label>Card ID:</Form.Label>
                    <Form.Control as="input" typy='number' className='disabled-valid-style' ref={cardIdInputRef} maxLength={20} required
                        onKeyDown={(e) => {
                           // ไม่ใช่ตัวเลขและไม่ใช่ Backspace ไม่ให้พิมพ์
                           if (!/[0-9]/.test(e.key) && !(e.key === 'Backspace')) {
                            e.preventDefault();
                        }
                        }} />
                    <Form.Control.Feedback type="invalid">Please Input Card ID</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="dateInput">
                    <Form.Label style={{ marginBottom: '12px' }}>Date of Birth:</Form.Label>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                        <DatePicker required
                            className={isInvalidDateOfbirth ? 'col-sm-12 datepicker-invalid pointer-datepicker' : 'col-sm-12 pointer-datepicker'}
                            autoOk
                            clearable
                            disableFuture
                            //label='วัน/เดือน/ปี'
                            invalidDateMessage='รูปแบบวันที่ไม่ถูกต้อง'
                            variant="diglog"
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            value={dateOfBirth}
                            onChange={(e) => { setDateOfBirth(e) }}
                            onOpen={() => { setIsInvalidDateOfbirth(false) }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <EventIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />
                    </MuiPickersUtilsProvider>
                    <Form.Control hidden isInvalid={isInvalidDateOfbirth}></Form.Control>
                    <Form.Control.Feedback type="invalid">Please Select Date of Birth</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Name & Surname */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="nameId">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={nameInputRef} maxLength={50} required />
                    <Form.Control.Feedback type="invalid">Please Input Name</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="surnameId">
                    <Form.Label>Surname:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={surnameInputRef} maxLength={50} required />
                    <Form.Control.Feedback type="invalid">Please Input Surname</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Company & Email */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="CompanyId">
                    <Form.Label>Company:</Form.Label>
                    <Form.Control as="select" className='disabled-valid-style' ref={conpanySelectRef}
                        defaultValue={''} required>
                        <option value="" disabled hidden>Please Select</option>
                        {
                            companies
                                ? companies.map((data) => { return (<option key={data.id} value={data.id}>{data.companyName}</option>) })
                                : null
                        }
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">Please Select Company</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="emailId">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" className='disabled-valid-style' ref={emailInputRef} maxLength={20} required />
                    <Form.Control.Feedback type="invalid">Please Input Email</Form.Control.Feedback>
                </Form.Group>
            </Row>

            {/* Address & Telephone */}
            <Row className='mb-2'>
                <Form.Group as={Col} xs={12} sm={12} md={6} lg={6} controlId="addressId">
                    <Form.Label>Address:</Form.Label>
                    <Form.Control as="input" className='disabled-valid-style' ref={addressInputRef} maxLength={150} required />
                    <Form.Control.Feedback type="invalid">Please Input Address</Form.Control.Feedback>
                </Form.Group>

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


export default PersonForm;