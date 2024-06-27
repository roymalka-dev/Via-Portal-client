/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IFile {
  _id: string;
  name: string;
  folder: string;
  path: string;
  type: "file";
  content: any; // TODO
  authority: string;
  data?: any;
  children?: null;
}

export interface Ifolder {
  _id: string;
  parentFolder: string | null;
  name: string;
  type: "folder";
  subfolders: Array<Ifolder>;
  filets: Array<IFile>;
  authority: string;
}
