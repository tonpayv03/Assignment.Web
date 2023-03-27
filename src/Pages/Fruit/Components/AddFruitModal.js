//#region Main Zone
import React, { useState, useRef, useEffect } from 'react'
import { withRouter, Link } from "react-router-dom";
//#endregion


//#region utils zone
import { Fruit as FruitService } from '../../../APIArmy/Fruit/Fruit'
//#endregion

//#region ui zone
import LayoutMain from "../../../Components/Layout/LayoutMain";
import DataTable from 'react-data-table-component';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import history from '../../../Helper/history';
import SwalFire from '../../../Helper/SwalFire';
//#endregion

const AddFruitModal = (props) => {

    const thisHistory = history
    const fileAccept = 'image/png,image/jpg,image/jpeg,image/gif,image/tiff,image/bmp'

    const nameInputRef = useRef();
    const fileInputRef = useRef();

    const [fileFeedback, setFileFeedback] = useState('Please Choose File');
    const [fileIsInvalid, setFileIsInvalid] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            // สั่งให้ validated ทำงาน
            setValidated(true);
            return;
        }

        let currentFile = fileInputRef.current.files[0]
        if (!currentFile) {
            setFileFeedback('Please Choose File')
            setFileIsInvalid(true);
            return;
        }

        if (fileIsInvalid) {
            return;
        }

        let requestObject = {
            name: nameInputRef.current.value,
            imageFile: currentFile
        }

        FruitService.AddFruit({ ...requestObject }).then(async (res) => {
            if (res?.isSuccess) {
                await SwalFire(`เพิ่มผลไม้สำเร็จ`, true)
                nameInputRef.current.value = ''
                fileInputRef.current.value = ''

                setValidated(false);
            }
        });
    };

    const handleChangeFile = (event) => {

        const validateImageType = (filetype) => {

            const typejpeg = "image/jpeg";
            const typejpg = "image/jpg";
            const typepng = "image/png";

            let currentType = filetype;
            switch (currentType) {
                case typejpeg:
                case typejpg:
                case typepng:
                    return true;
                    break;
                default:
                    return false;
                    break;
            }
        }

        let currentFile = fileInputRef.current.files[0]
        console.log('currentfile: ', currentFile)
        console.log('typeof currentfile: ', typeof (currentFile))
        let fileSize = currentFile.size;
        let fileType = currentFile.type;
        console.log('fileSize: ', fileSize)
        console.log('fileType: ', fileType)

        if (!validateImageType(fileType)) {
            setFileFeedback('ประเภทรูปภาพไม่ถูกต้อง, เรารองรับ png, jpg, jpeg')
            setFileIsInvalid(true);
        } else {
            setFileFeedback('Please Choose File')
            setFileIsInvalid(false);
        }
    }

    return (
        <>
            <Modal width={1500}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                backdrop="static"
                keyboard={false} >
                <div>
                    <Modal.Header className='mb-4'>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Create
                        </Modal.Title>
                    </Modal.Header>

                    <Form noValidate validated={validated} onSubmit={handleSubmit} disabled className='mx-3' >
                        <Row className="mb-3">
                            <Col xs={12} sm={12} md={2} className="horizontal-right text-left">
                                <Form.Label>Name:</Form.Label>
                            </Col>
                            <Form.Group as={Col} xs={12} sm={12} md={8} controlId="nameId">
                                <Form.Control as="input" className='disabled-valid-style' ref={nameInputRef} maxLength={50} required />
                                <Form.Control.Feedback type="invalid">Please Input Name</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Col xs={12} sm={12} md={2} className="horizontal-right text-left">
                                <Form.Label>Photo:</Form.Label>
                            </Col>
                            <Form.Group as={Col} xs={12} sm={12} md={8} controlId="fileId">
                                <Form.Control type="file"
                                    ref={fileInputRef}
                                    accept={fileAccept}
                                    isInvalid={fileIsInvalid}
                                    required
                                    className='disabled-valid-style enebled-invalid-style add-fruit'
                                    size="lg"
                                    onChange={handleChangeFile}
                                    onClick={(event) => {
                                        console.log('onClick')

                                        // เมื่อกด browse ใหม่ เคลียร์ value เก่าออกไปเลย
                                        // เพื่อป้องกัน error ที่เกิดจากการ set value = null ใน onClick 
                                        // ทำให้เมื่อกด uploadFile แล้วจะพัง เพราะไฟล์เป็น undefined
                                        fileInputRef.current.value = ''

                                        // กันไม่ให้เข้า onChange ทุกครั้ง
                                        event.target.value = null
                                    }} />
                                <Form.Control.Feedback type="invalid">{fileFeedback}</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className='horizontal-center mb-4'>
                            <Button type="submit" id="save" name="save" value="save" className="mt-2 mb-2 btn btn-primary" style={{ width: 'auto', minWidth: 140 }}>Save</Button>
                            <Button type="button" className="mt-2 mb-2 mx-2 btn btn-secondary" onClick={props.handleClose} style={{ width: 'auto', minWidth: 140 }} >Cancle</Button>
                        </Row>

                    </Form>
                </div>
            </Modal>
        </>
    );
}


export default AddFruitModal;