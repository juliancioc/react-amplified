import { Reducer } from "redux";
import { ILocation } from "./types";

const INITIAL_STATE: ILocation = {
  id: 0
};

const location: Reducer<ILocation> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOCATION": {
      const { id } = action.payload;
      console.log('redux locationId', id)
      return {
        ...state,
        id: id.id
      };
    }
    default: {
      return state;
    }
  }
};

export default location;
