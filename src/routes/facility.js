import { Facility } from "components/pages";
import facilitiesRoute from "./facilities";

export const buildPathToFacility = (facilityId) => {
  return `${facilitiesRoute.path}/${facilityId}`;
};

const route = {
  path: buildPathToFacility(":facilityId"),
  exact: true,
  className: "facility",
  component: Facility,
};

export default route;
