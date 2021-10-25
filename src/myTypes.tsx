/* eslint-disable no-unused-vars */

import { ReactElement } from 'react';

export type user = {
  userString: string;
  email: string;
};

export type UploadProps = {
  anonScript: string;
  checkIfDateTimeRequired: (value: string) => Promise<boolean>;
  retrieveVisitsAndModalities: (value: string) => Promise<Response>;
  availableProjects: Array<string>;
  handleUploadFiles: (
    projectId: string,
    subjectId: string,
    zippedFolder: Blob,
    visit: visitProps,
    session: string,
  ) => Promise<Response>;
  handleUploadPdf: (
    pdfFile: File,
    subjectId: string,
    url: string,
  ) => Promise<Response>;
};

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
    body?: Blob | string;
  };
};

export type myFiles = Array<myFile>;

export type errorsWithUploadedFiles = {
  dateTimeError: boolean;
  dateTimeErrorFiles: Array<{
    filename: string;
  }>;
  studyInstanceUidError: boolean;
  expectedModality: string;
  expectedModalityNotFound: boolean;
};

export type dicomTags = {
  date: string;
  time: string;
  UID: string;
  modality: string;
};

export type SessionInformationProps = {
  projectId: string;
  subjectId: string;
  dateTime: dateTimeProps;
  availableProjects: Array<string>;
  onProjectChange: (value: string) => void;
  setSubjectId: (value: string) => void;
  setDateTime: (value: dateTimeProps) => void;
  showVisitsAndModalities: boolean;
  availableVisitsAndModalities: visitsAndModaltiesProps;
  setVisit: (value: visitProps) => void;
  selectedVisit: visitProps;
  setModality: (value: modalityProps) => void;
  selectedModality: modalityProps;
  pdfFile: File;
  onPdfUpload: (file: File) => void;
  onPdfDiscard: () => void;
  isDateTimeInputRequired: boolean;
  pdfModalOpen: boolean;
  setPdfModalOpen: (value: boolean) => void;
};

export type ImagingDataProps = {
  projectId: string;
  subjectId: string;
  files: myFiles;
  dateTime: dateTimeProps;
  onFileUpload: (value: Array<File>) => void;
  totalFiles: number;
  numOfFilesParsed: number;
  folderName: string;
  discardDicomFiles: () => void;
  isDateTimeInputRequired: boolean;
  showVisitsAndModalities: boolean;
  selectedVisit: visitProps;
  selectedModality: modalityProps;
  zipSizeError: string;
};

export type PageFooterProps = {
  sendingFiles: boolean;
  onSubmit: () => void;
  resetAllData: () => void;
  uploadProgress: uploadProgressProps;
  readyToUpload: boolean;
};

export type PageHeaderProps = {
  userInfo: {
    userString: string;
    email: string;
  };
};

export type PdfModalProps = {
  pdfModalOpen: boolean;
  handlePdfClose: () => void;
  pdfFile: File;
  onPdfDiscard: () => void;
};

export type siteWideAnonResponse = {
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

export type availableProjectsResponse = Array<{
  approvalDate: number;
  approved: boolean;
  approverUserId: number;
  createDate: number;
  email: string;
  guid: string;
  hashedEmail: string;
  projectId: string;
  requestId: number;
  role: string;
  userId: number;
  userString: string;
}>;

export type DicomValidationErrorModalProps = {
  files: myFiles;
  dateTime: dateTimeProps;
  areFilesReady: boolean;
  discardDicomFiles: () => void;
  isDateTimeInputRequired: boolean;
  isModalityRequired: boolean;
  selectedModality: modalityProps;
};

export type uploadProgressProps = {
  totalNumberOfChunks: number;
  chunksSent: number;
};

export type visitsAndModaltiesProps = Array<visitProps>;

export type visitProps = {
  code: string;
  key: string;
  modalities: Array<modalityProps>;
  name: string;
};

export type modalityProps = {
  display: string;
  key: string;
  label: string;
  type: string;
};

export const emptyModality: modalityProps = {
  display: '',
  key: '',
  label: '',
  type: '',
};

export const emptyVisit: visitProps = {
  code: '',
  key: '',
  modalities: [],
  name: '',
};

export type MenuSelectionProps = {
  label: ReactElement;
  field: string;
  value: string;
  menuOptions: Array<string>;
  emptyOptionText: string;
  handleOnChange: (value: string) => void;
};

export type namingConventionProps = {
  pattern: string;
};

export type dateTimeProps = {
  rawinputValue: string;
  yyMMddFormat: string;
  date: string;
  hour: string;
  minute: string;
};

export const emptyDateTime: dateTimeProps = {
  rawinputValue: '',
  yyMMddFormat: '',
  date: '',
  hour: '',
  minute: '',
};
