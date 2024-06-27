/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

/**
 * Function to handle editing an item.
 */
export const editItemHandler = (
  id: string,
  items: any,
  handler: (value: SetStateAction<any>) => void
) => {
  const itemToEdit = items.find((item: any) => item._id === id) || null;
  handler(itemToEdit);
};
