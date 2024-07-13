/* eslint-disable @typescript-eslint/no-explicit-any */
import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateGeneralConfigsTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: `General Configs  ${
      scopingBadges.acsa +
      " " +
      scopingBadges.upgradeTeam +
      " " +
      scopingBadges.mandatory
    }`,

    rows: [
      [
        "Feedback",
        configurations.show_rider_feedback_distribution_toggle
          ? configurations.show_rider_feedback_distribution_toggle +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Rider name format in driver app",
        configurations.rider_name_trimming_schema_type
          ? configurations.rider_name_trimming_schema_type +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Allow_shared_phone",
        configurations.allow_shared_phones
          ? configurations.allow_shared_phones +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "No-show timer",
        configurations.no_show_timer_default_time_seconds
          ? configurations.no_show_timer_default_time_seconds +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "PU & DO Notes",
        configurations.voc_book_ride_enable_pickup_and_dropoff_notes
          ? configurations.voc_book_ride_enable_pickup_and_dropoff_notes +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Travel reasons",
        configurations.support_travel_reasons
          ? configurations.support_travel_reasons +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Rider call driver",
        configurations.show_phone_button_in_rider_app &&
        configurations.allow_rider_call_through
          ? configurations.allow_rider_call_through +
            " " +
            configurations.show_phone_button_in_rider_app +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "Driver call rider",
        configurations.driver_call_rider
          ? configurations.driver_call_rider +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      [
        "PM + which types?",
        configurations.available_payment_methods_configurations
          ? configurations.available_payment_methods_configurations +
            " " +
            scopingBadges.generatedWithTool
          : "",
      ],
      ["Special features?", ""],
      [
        "Menu configs",
        configurations.menu
          ? configurations.menu + " " + scopingBadges.generatedWithTool
          : "",
      ],
      ["Override configuration", ""],
      ["Ride importers", ""],
    ],
  };
};
