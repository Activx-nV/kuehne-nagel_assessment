import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { shipmentsData: [], error: '', specificShipmentDetails: {} };

const dataSlice = createSlice({
  name: 'shipmentsData',
  initialState,
  reducers: {
    setShipmentsData(state, action) {
      state.shipmentsData = action.payload;
    },
    setUpdatedDataFromModal(state, action) {
      const beforeUpdateOrderNo = action.payload.previousDataState.orderNo;
      const updatedDetails = {
        orderNo: action.payload.orderNo,
        customer: action.payload.customer,
        consignee: action.payload.consignee,
        date: action.payload.date,
        trackingNo: action.payload.trackingNo,
        status: action.payload.status,
      };
      state.shipmentsData.forEach((item, index) => {
        if (item.orderNo === beforeUpdateOrderNo) {
          state.shipmentsData[index] = updatedDetails;
        }
      });
    },
    setSpecificShipmentDetails(state, action) {
      const specificItem = state.shipmentsData.filter((item) => item.orderNo === action.payload);
      state.specificShipmentDetails = specificItem;
    },
    deleteShipmentData(state, action) {
      const updatedItems = state.shipmentsData.filter((item) => item.orderNo !== action.payload);
      state.shipmentsData = updatedItems;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { data: dataSlice.reducer },
});

export const dataActions = dataSlice.actions;

export const fetchShipmentsData = () => {
  return async (dispatch) => {
    const url = 'https://my.api.mockaroo.com/shipments.json?key=5e0b62d0';
    const response = await fetch(url);
    if (!response.ok) {
      dispatch(dataActions.setError('Request issue. Something went wrong.'));
    }
    const data = await response.json();
    dispatch(dataActions.setShipmentsData(data));
  };
};

export default store;
