/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateGeneralConfigsTableData = (
  configurations: CityConfigurations
): TableData => {
  const {
    show_rider_feedback_distribution_toggle,
    rider_name_trimming_schema_type,
    allow_shared_phones,
    no_show_timer_default_time_seconds,
    voc_book_ride_enable_pickup_and_dropoff_notes,
    support_travel_reasons,
    show_phone_button_in_rider_app,
    allow_rider_call_through,
    driver_call_rider,
    available_payment_methods_configurations,
    menu,
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
        rider_name_trimming_schema_type
          ? `${rider_name_trimming_schema_type} ${generatedWithTool}`
          : "",
      ],
      [
        "Allow_shared_phone",
        allow_shared_phones
          ? `${allow_shared_phones} ${generatedWithTool}`
          : "",
      ],
      [
        "No-show timer",
        no_show_timer_default_time_seconds
          ? `${no_show_timer_default_time_seconds} ${generatedWithTool}`
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
      [
        "PM + which types?",
        available_payment_methods_configurations
          ? `${available_payment_methods_configurations} ${generatedWithTool}`
          : "",
      ],
      ["Special features?", ""],
      ["Menu configs", menu ? `${menu} ${generatedWithTool}` : ""],
      ["Override configuration", ""],
      ["Ride importers", ""],
    ],
  };
};
