/* eslint-disable no-unused-vars */
export class myFile {
  fileName;
  size;
  dicomTags: dicomTags;
  anonymizedFile;

  constructor(
    fileName: string,
    size: number,
    dicomTags: dicomTags,
    anonymizedFile: Blob,
  ) {
    this.fileName = fileName;
    this.size = size;
    this.dicomTags = dicomTags;
    this.anonymizedFile = anonymizedFile;
  }
}

export type fetchParams = {
  method: string;
  withCredentails: boolean;
  credentials: RequestCredentials;
  headers: {
    Authorization: string;
  };
  body?: Blob;
};

export type myFiles = Array<myFile>;

export type dateTimeErrors = {
  dateTimeError: boolean;
  studyInstanceUidError: boolean;
};

export type dicomTags = {
  date: string;
  time: string;
  UID: string;
};

export type InputFieldsProps = {
  onProjectBlur: (value: string) => void;
  setSubjectId: (value: string) => void;
  setDateTime: (value: string) => void;
  isDateTimeInputRequired: boolean;
};

export type SubmitButtonProps = {
  isUploadDisabled: boolean;
  fileCheck: dateTimeErrors;
  areFilesReady: boolean;
  sendingFiles: boolean;
  onSubmit: () => void;
};

export type UploadButtonProps = {
  onFileUpload: (value: Array<File>) => void;
  isUploadDisabled: boolean;
  totalVolume: number;
  totalFiles: number;
  numOfAnonomyzedFiles: number;
  fileCheck: dateTimeErrors;
};
