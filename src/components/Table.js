import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../store/index';
import { fetchShipmentsData } from '../store/index';
import './Table.css';
import '../assets/css/fresh-bootstrap-table.css';
import trashImage from '../assets/img/trash.svg';
import detailsImage from '../assets/img/card-text.svg';
import Modal from '../UI/Modal';

const Table = () => {
  const dispatch = useDispatch();
  const shipmentsData = useSelector((state) => state.data.shipmentsData);
  const error = useSelector((state) => state.data.error);
  const [dataDetails, setDataDetails] = useState({});
  const [cartIsShown, setCartIsShown] = useState(false);
  useEffect(() => {
    dispatch(fetchShipmentsData());
  }, [dispatch]);

  const showModal = (orderNo, date, customer, trackingNo, status, consignee) => {
    setDataDetails({ orderNo, date, customer, trackingNo, status, consignee });
    setCartIsShown(true);
  };
  const onCloseHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div className="fresh-table full-color-azure center">
      <table id="fresh-table" className="table">
        <thead>
          <tr>
            <th data-field="order-number">ORDER №</th>
            <th className="tablet_appearance" data-field="delivery-date">
              DELIVERY DATE
            </th>
            <th className="mobile_appearance" data-field="customer">
              CUSTOMER
            </th>
            <th className="tablet_appearance" data-field="tracking-number">
              TRACKING №
            </th>
            <th className="tablet_appearance" data-field="status">
              STATUS
            </th>
            <th className="mobile_appearance" data-field="consignee">
              CONSIGNEE
            </th>
          </tr>
        </thead>

        <tbody className="table-body_appearance">
          {shipmentsData.length > 1 &&
            shipmentsData.map((item) => {
              return (
                <tr key={item.orderNo}>
                  <td>{item.orderNo}</td>
                  <td className="tablet_appearance">{item.date}</td>
                  <td className="mobile_appearance">{item.customer}</td>
                  <td className="tablet_appearance">{item.trackingNo}</td>
                  <td className="tablet_appearance">{item.status}</td>
                  <td className="mobile_appearance">{item.consignee}</td>
                  <td className="separator"></td>
                  <td>
                    <button
                      className="detailsBtn"
                      props={dataDetails}
                      onClick={() =>
                        showModal(
                          item.orderNo,
                          item.date,
                          item.customer,
                          item.trackingNo,
                          item.status,
                          item.consignee
                        )
                      }
                    >
                      <img src={detailsImage} alt="details button" />
                    </button>
                  </td>
                  <td>
                    <button className="deleteBtn">
                      <img
                        src={trashImage}
                        alt="delete button"
                        onClick={() => {
                          dispatch(dataActions.deleteShipmentData(item.orderNo));
                        }}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {error && <p className="error">{error}</p>}
      {cartIsShown && <Modal dataDetails={dataDetails} onClose={onCloseHandler} />}
    </div>
  );
};

export default Table;
