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
  domain: string;
  params: {
    method: string;
    withCredentails: boolean;
    credentials: RequestCredentials;
    headers?: {
      Authorization: string;
    };
    body?: Blob;
  };
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

export type SessionInformationProps = {
  projectId: string;
  subjectId: string;
  dateTime: string;
  onProjectBlur: (value: string) => void;
  onProjectChange: (value: string) => void;
  setSubjectId: (value: string) => void;
  setDateTime: (value: string) => void;
  pdfFile: File;
  onPdfUpload: (file: Array<File>) => void;
  onPdfDiscard: () => void;
  isDateTimeInputRequired: boolean;
};

export type UploadButtonProps = {
  onFileUpload: (value: Array<File>) => void;
  totalVolume: number;
  totalFiles: number;
  numOfAnonomyzedFiles: number;
  fileCheck: dateTimeErrors;
};

export type PageFooterProps = {
  sendingFiles: boolean;
  onSubmit: () => void;
  resetAllData: () => void;
};
