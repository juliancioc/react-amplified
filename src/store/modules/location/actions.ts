import { ILocation } from "./types";

export function setLocation(id: ILocation) {
  console.log('action locationId', id)
  return {
    type: "LOCATION",
    payload: {
      id,
    },
  };
}
