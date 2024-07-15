import { CityConfigurations } from "@/types/city.types";
import { TableData } from "../PageBuilder";
import { scopingBadges } from "../elements/badge";

export const generateBookingConfigsTableData = (
  configurations: CityConfigurations
): TableData => {
  return {
    headline: `Booking Configs ${scopingBadges.acsa} ${scopingBadges.upgradeTeam} ${scopingBadges.mandatory}`,
    headers: ["Configuration", "Value"],
    rows: [
      [
        "Booking types - From app + Admin",
        configurations.admin_booking_types
          ? `${configurations.admin_booking_types} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Commitment_type",
        configurations.commitment_type
          ? `${configurations.commitment_type} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "immediate_apply_threshold_minutes",
        configurations.immediate_apply_threshold_minutes
          ? `${configurations.immediate_apply_threshold_minutes} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Prescheduling_timeslot_delta_minutes (Timeslots)",
        configurations.prescheduling_timeslot_delta_minutes
          ? `${configurations.prescheduling_timeslot_delta_minutes} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Recurring",
        configurations.recurring
          ? `${configurations.recurring} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Prescheduling_days_limit",
        configurations.prescheduling_days_limit
          ? `${configurations.prescheduling_days_limit} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Series_renewal_duration_days",
        configurations.series_renewal_duration_days
          ? `${configurations.series_renewal_duration_days} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "End_recurring_policy",
        configurations.end_recurring_policy
          ? `${configurations.end_recurring_policy} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "renew_series_enabled",
        configurations.renew_series_enabled
          ? `${configurations.renew_series_enabled} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Shown_recurring_series_types",
        configurations.shown_recurring_series_types
          ? `${configurations.shown_recurring_series_types} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Block_edit_ride_by_rider",
        configurations.block_edit_ride_by_rider
          ? `${configurations.block_edit_ride_by_rider} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Prescheduling_arrival_minutes_cant_order",
        configurations.prescheduling_arrival_minutes_cant_order
          ? `${configurations.prescheduling_arrival_minutes_cant_order} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Prescheduling_arrival_minutes_cant_order_admin",
        configurations.prescheduling_arrival_minutes_cant_order_admin
          ? `${configurations.prescheduling_arrival_minutes_cant_order_admin} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Prescheduling_minutes_cant_order_admin",
        configurations.prescheduling_minutes_cant_order_admin
          ? `${configurations.prescheduling_minutes_cant_order_admin} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Prescheduling_minutes_cant_order",
        configurations.prescheduling_minutes_cant_order
          ? `${configurations.prescheduling_minutes_cant_order} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Finalize config",
        configurations.finalize_config
          ? `"finalize_time_before_ride_in_minutes": ${configurations.finalize_config.timeBeforeRide}, "finalize_time_buffer_in_minutes": ${configurations.finalize_config.timeBuffer} ${scopingBadges.generatedWithTool}`
          : "",
      ],
      [
        "Waiting_list_threshold_in_min",
        configurations.waiting_list_threshold_in_min
          ? `${configurations.waiting_list_threshold_in_min} ${scopingBadges.generatedWithTool}`
          : "",
      ],
    ],
  };
};
