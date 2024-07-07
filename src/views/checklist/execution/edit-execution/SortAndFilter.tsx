/* eslint-disable @typescript-eslint/no-explicit-any */
// Comparator functions
export const compareByNameAsc = (a: any, b: any) =>
  a.name.localeCompare(b.name);
export const compareByNameDesc = (a: any, b: any) =>
  b.name.localeCompare(a.name);
export const compareByExist =
  (isItemInExisting: (id: string) => boolean) => (a: any, b: any) => {
    return Number(isItemInExisting(b._id)) - Number(isItemInExisting(a._id));
  };
export const compareByNotExist =
  (isItemInExisting: (id: string) => boolean) => (a: any, b: any) => {
    return Number(isItemInExisting(a._id)) - Number(isItemInExisting(b._id));
  };

// Filter functions
export const filterItems = (
  allItems: any[],
  query: string,
  filterBy: string,
  isItemInExisting: (id: string) => boolean
) => {
  let items = allItems;

  if (query) {
    items = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (filterBy === "existing") {
    items = items.filter((item) => isItemInExisting(item._id));
  } else if (filterBy === "notExisting") {
    items = items.filter((item) => !isItemInExisting(item._id));
  }

  return items;
};
