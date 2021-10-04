import { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { dataActions } from '../store/index';
import './Modal.css';

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClose} />;
};

const ModalOverlay = ({ dataDetails }) => {
  const dispatch = useDispatch();
  const [dataUpdated, setDataUpdated] = useState(false);
  // const specificDetails = useSelector(state => state.data.specificShipmentDetails);
  let tempDataStore = {};
  const orderInputRef = useRef();
  const customerInputRef = useRef();
  const consigneeInputRef = useRef();
  const dateInputRef = useRef();
  const trackingNumberInputRef = useRef();
  const statusInputRef = useRef();

  const setUpdatedDataFromModal = (event) => {
    event.preventDefault();
    tempDataStore = {
      previousDataState: dataDetails,
      orderNo: orderInputRef.current.value,
      customer: customerInputRef.current.value,
      consignee: consigneeInputRef.current.value,
      date: dateInputRef.current.value,
      trackingNo: trackingNumberInputRef.current.value,
      status: statusInputRef.current.value,
    };
    dispatch(dataActions.setUpdatedDataFromModal(tempDataStore));
    setDataUpdated(true);
  };

  const resetSaveButton = () => {
    setDataUpdated(false);
  };

  useEffect(() => {
    dispatch(dataActions.setSpecificShipmentDetails(dataDetails.orderNo));
  }, [dispatch, dataDetails.orderNo]);

  return (
    <div className="modal">
      <div className="content">
        <h2>SHIPMENT DETAILS</h2>
        <form onSubmit={setUpdatedDataFromModal}>
          <div className="details_wrapper">
            <div className="Details-Group_1">
              <label htmlFor="orderNo">Order Number</label>
              <input
                type="text"
                id="orderNo"
                onChange={resetSaveButton}
                ref={orderInputRef}
                defaultValue={dataDetails.orderNo}
              />
              <label htmlFor="customer">Customer</label>
              <input
                onChange={resetSaveButton}
                type="text"
                id="customer"
                ref={customerInputRef}
                defaultValue={dataDetails.customer}
              />
              <label htmlFor="consignee">Consignee</label>
              <input
                onChange={resetSaveButton}
                type="text"
                id="consignee"
                ref={consigneeInputRef}
                defaultValue={dataDetails.consignee}
              />
            </div>
            <div className="Details-Group_2">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                ref={dateInputRef}
                onChange={resetSaveButton}
                defaultValue={dataDetails.date}
              />
              <label htmlFor="trackingNo">Tracking Number</label>
              <input
                onChange={resetSaveButton}
                type="text"
                id="trackingNo"
                ref={trackingNumberInputRef}
                defaultValue={dataDetails.trackingNo}
              />
              <label htmlFor="status">Status</label>
              <input
                onChange={resetSaveButton}
                type="text"
                id="status"
                ref={statusInputRef}
                defaultValue={dataDetails.status}
              />
            </div>
          </div>
          {!dataUpdated ? <button>Save</button> : <button>Successfully saved!</button>}
        </form>
      </div>
    </div>
  );
};

const portalElementBackdrop = document.getElementById('backdrop');
const portalElementModal = document.getElementById('modal');

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElementBackdrop)}
      {ReactDOM.createPortal(<ModalOverlay dataDetails={props.dataDetails} />, portalElementModal)}
    </>
  );
};

export default Modal;
