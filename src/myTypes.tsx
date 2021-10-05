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
  dateTimeErrorFiles: Array<{
    filename: string;
  }>;
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
  pdfModalOpen: boolean;
  setPdfModalOpen: (value: boolean) => void;
};

export type ImagingDataProps = {
  files: myFiles;
  dateTime: string;
  onFileUpload: (value: Array<File>) => void;
  totalFiles: number;
  numOfAnonomyzedFiles: number;
  folderName: string;
  discardDicomFiles: () => void;
};

export type PageFooterProps = {
  sendingFiles: boolean;
  onSubmit: () => void;
  resetAllData: () => void;
};

export type PdfModalProps = {
  pdfModalOpen: boolean;
  handlePdfClose: () => void;
  pdfFile: File;
  onPdfDiscard: () => void;
};

export type siteWideAnonAPI = {
  ResultSet: {
    Result: Array<{
      contents: string;
      create_date: string;
      path: string;
      project: string;
      reason: string;
      status: string;
      tool: string;
      unversioned: string;
      user: string;
      version: string;
    }>;
  };
};

export type DicomValidationErrorModalProps = {
  files: myFiles;
  dateTime: string;
  areFilesReady: boolean;
  discardDicomFiles: () => void;
};
