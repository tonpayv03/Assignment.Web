//#region Main Zone
import React, { useState, useRef, useEffect } from 'react'
import { withRouter, Link } from "react-router-dom";
//#endregion


//#region utils zone
import { Fruit as FruitService } from '../../APIArmy/Fruit/Fruit'
import history from '../../Helper/history';
//#endregion

//#region ui zone
import LayoutMain from "../../Components/Layout/LayoutMain";
import DataTable from 'react-data-table-component';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import AddFruitModal from './Components/AddFruitModal'
//#endregion

const Fruit = () => {

    const thisHistory = history

    const searchTextInputRef = useRef();

    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    
    const [isShowModal, setIsShowModal] = useState(false);
    
    const columns = [
        {
            name: 'ชื่อผลไม้',
            selector: row => row.name,
            width: "300px"
        },
        {
            name: '',
            selector: row => <img className="mt-1" src={`https://localhost:44344/api/v1/Fruit/GetImage/${row.fileName}`} width={'auto'} height={'150'} />,
        },
    ];

    useEffect(() => {
        console.log('useEffect of isShowModal start')
        let mounted = true;

        if (!isShowModal) {
            console.log('call onListAllFruit by isShowModal == false')
            onListAllFruit();
        }

        console.log('useEffect of isShowModal end')
        return () => mounted = false;
    }, [isShowModal])

    const onListAllFruit = () => {

        let process = true;

        FruitService.ListAllFruit().then((res) => {
            if (process) {
                if (res?.isSuccess) {
                    setData(res.fruits);
                    setFilterData(res.fruits);
                }
            }

            process = false
        });
    }

    const onSearchChange = () => {
        let text = !!searchTextInputRef.current.value ? searchTextInputRef.current.value.toLowerCase() : '';
        var filter = data.filter(obj => {
            return obj.name.toLowerCase().includes(text);
        });
        setFilterData(filter);
    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '200px', // override the row height
            },
        },
    };

    return (
        <React.Fragment>
            <LayoutMain>
                <React.Fragment>
                    <div className="col-lg-12 pl-1 pr-1">
                        <div className="row">
                            <div className="col-lg-12 pl-0 pr-0">
                                <div className="gf-backend-container">
                                    <div className="hr-pagination-bar">
                                        <Link to={'/'} >
                                            <i className="fas fa-chevron-left"></i>
                                            <h5 className="d-inline-block">Back</h5>
                                        </Link>
                                    </div>


                                    <Card className="gf-backend-box">
                                        <Card.Body>
                                            <h2>ผลไม้</h2>
                                            <hr className="mb-4 mt-4"></hr>
                                            <Form className='float-end'>
                                                {/* <Button className='float-end mb-2' onClick={() => { thisHistory.push("/Fruit/Add") }} >เพิ่มผลไม้</Button> */}
                                                <Button className='float-end mb-2' onClick={() => setIsShowModal(true) } >เพิ่มผลไม้</Button>
                                                <Form.Control as="input" className='disabled-valid-style' width={150}
                                                    ref={searchTextInputRef} maxLength={50} required placeholder="Search here"
                                                    onChange={onSearchChange} />
                                            </Form>

                                            <DataTable className='dataTables_wrapper' columns={columns} data={filterData} customStyles={customStyles}  />

                                            <AddFruitModal show={isShowModal} handleClose={() => setIsShowModal(false)} />
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </LayoutMain>
        </React.Fragment >
    );
};

export default withRouter(Fruit);