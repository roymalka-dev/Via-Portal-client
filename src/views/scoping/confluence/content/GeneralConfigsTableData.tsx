/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateGeneralConfigsTableData = (
  configurations: CityConfigurations
): TableData => {
  const {
    show_rider_feedback_distribution_toggle,
    rider_last_name_format_for_driver_app_display,
    allow_shared_phones,
    voc_book_ride_enable_pickup_and_dropoff_notes,
    support_travel_reasons,
    show_phone_button_in_rider_app,
    allow_rider_call_through,
    driver_call_rider,
    minimum_no_show_wait,
    minimum_no_show_wait_early_arrival,
  } = configurations;

  const generatedWithTool = scopingBadges.generatedWithTool;

  return {
    headline: `General Configs ${scopingBadges.acsa} ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
    headers: ["Configuration", "Value"],
    rows: [
      [
        "Feedback",
        show_rider_feedback_distribution_toggle
          ? `${show_rider_feedback_distribution_toggle} ${generatedWithTool}`
          : "",
      ],
      [
        "Rider name format in driver app",
        rider_last_name_format_for_driver_app_display
          ? `${rider_last_name_format_for_driver_app_display} ${generatedWithTool}`
          : "",
      ],
      [
        "Allow_shared_phone",
        allow_shared_phones
          ? `${allow_shared_phones} ${generatedWithTool}`
          : "",
      ],

      [
        "Minimum no show timer",
        minimum_no_show_wait
          ? `${minimum_no_show_wait} ${generatedWithTool}`
          : "",
      ],
      [
        "Minimum no show timer for early arrival",
        minimum_no_show_wait_early_arrival
          ? `${minimum_no_show_wait_early_arrival} ${generatedWithTool}`
          : "",
      ],

      [
        "PU/DO Notes",
        voc_book_ride_enable_pickup_and_dropoff_notes
          ? `${voc_book_ride_enable_pickup_and_dropoff_notes} ${generatedWithTool}`
          : "",
      ],
      [
        "Travel reasons",
        support_travel_reasons
          ? `${support_travel_reasons} ${generatedWithTool}`
          : "",
      ],
      [
        "Rider call driver",
        show_phone_button_in_rider_app && allow_rider_call_through
          ? `${allow_rider_call_through} ${show_phone_button_in_rider_app} ${generatedWithTool}`
          : "",
      ],
      [
        "Driver call rider",
        driver_call_rider ? `${driver_call_rider} ${generatedWithTool}` : "",
      ],

      ["Special features?", ""],

      ["Override configuration", ""],
      ["Ride importers", ""],
    ],
  };
};
