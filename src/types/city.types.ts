/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CityConfigurations {
  city_id?: string;
  date?: string;
  city_short_code?: string;
  service_type?: string;
  tenant_id?: string;
  region?: string;
  ps?: string;
  pso?: string;
  psm?: string;
  c2c_d2d?: string;
  web_app_domain_url?: string;
  max_eta?: string;
  end_break_early?: string;
  commitment_type?: string;
  time_before_end_of_service?: string;
  time_after_end_of_service?: string;
  rider_billing_type?: string;
  city_overview_link?: string;
  jira_ticket?: string;
  send_welcome_email?: string;
  rider_types?: any;
  show_rider_feedback_distribution_toggle?: string;
  allow_shared_phones?: string;
  voc_book_ride_enable_pickup_and_dropoff_notes?: string;
  support_travel_reasons?: string;
  available_payment_methods_configurations?: string;
  menu?: string;
  recurring?: string;
  should_trim_last_name?: string;
  minimum_no_show_wait?: string;
  minimum_no_show_wait_early_arrival?: string;
  enable_spontaneous_breaks_in_prebooking?: string;
  enable_dynamic_breaks?: string;
  min_break_duration_in_seconds?: string;
  max_break_duration_in_seconds?: string;
  allow_driver_breaks?: string;
  allow_breaks_anywhere?: string;
  calc_no_show_wait_for_early_arrival_based_on_arrival_time?: string;
  on_demand_minimum_no_show_wait_by_ride_type_for_early_arrival?: string;
  on_demand_no_show_priority_order?: string;
  prebooking_minimum_no_show_wait_by_ride_type?: string;
  prebooking_minimum_no_show_wait_by_ride_type_for_early_arrival?: string;
  prebooking_no_show_priority_order?: string;
  no_show_timer_default_time_seconds?: string;
  rider_name_trimming_schema_type?: string;
  allow_public_transport_proposals?: string;
  min_request_distance?: string;
  admin_booking_types?: string;
  immediate_apply_threshold_minutes?: string;
  prescheduling_timeslot_delta_minutes?: string;
  allow_prescheduled_ride_recurring_requests?: string;
  prescheduling_days_limit?: string;
  series_renewal_duration_days?: string;
  end_recurring_policy?: string;
  renew_series_enabled?: string;
  shown_recurring_series_types?: string;
  block_edit_ride_by_rider?: string;
  prescheduling_arrival_minutes_cant_order?: string;
  prescheduling_arrival_minutes_cant_order_admin?: string;
  prescheduling_minutes_cant_order_admin?: string;
  prescheduling_minutes_cant_order?: string;
  waiting_list_threshold_in_min?: string;
  show_phone_button_in_rider_app?: string;
  max_distance_from_pickup_stop_point?: string;
  max_distance_from_dropoff_stop_point?: string;
  max_distance_from_stop_point?: string;
  max_distance_from_terminal_stop_point?: string;
  max_distance_from_break_terminal_stop_point?: string;
  min_driver_break_seconds?: string;
  max_driver_break_seconds?: string;
  nightly_logout_end_shift_enabled?: string;
  driver_call_rider?: string;
  flex_no_activity_auto_end_shift?: string;
  polygonpermission?: any;
  concessiontype?: any;
  maskedphone?: string;
  enable_skip_billing_v2?: string;
  service_hours?: any;
  finalize_config?: any;
  pricing?: any;
  acsa_requests?: any;
  acsa_vans?: any;
  android_version?: string;
  ios_version?: string;
  android_link?: string;
  ios_link?: string;
  app_name?: string;
  schedule_type?: string;
  languages?: string[];
  country?: string;
  city?: string;
  app_image?: string;
  allow_rider_call_through?: boolean;
  can_book_free_rides_without_pm?: boolean;
  rider_last_name_format_for_driver_app_display?: string;
  enable_driver_breaks_control?: string;
  service_hours_for_prescheduling_departure_time_selection?: any;
  finalize_methods?: string;
  polygon_blockers?: any;
  concessions?: any;
  available_plus_one_types?: any;
}
