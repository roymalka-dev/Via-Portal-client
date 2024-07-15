/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generatePricingTableData = (
  configurations: CityConfigurations
): TableData => {
  const pricingArray = configurations.pricing ?? [];
  return {
    headline: `Pricing (by formula) ${
      scopingBadges.upgradeTeam + " " + scopingBadges.mandatory
    }`,
    headers: ["Ride type", "Price", "No show / cancellation fees"],
    rows: pricingArray.map((price: any) => [
      price.rideType || "",
      price.price || "",
      price.noShowCancellationFees || "",
    ]),
  };
};
