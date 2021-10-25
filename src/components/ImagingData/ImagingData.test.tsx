import renderer from 'react-test-renderer'
import ImagingData from './ImagingData'
import {
  dateTimeProps,
  emptyDateTime,
  emptyModality,
  emptyVisit,
  myFiles,
} from '../../myTypes'

it('renders disabled, no projectId, no subjectId, dateTime not required, visits/modalities not required, anon not begun', () => {
  const projectId = ''
  const subjectId = ''
  const files: myFiles = []
  const dateTime = emptyDateTime
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = false
  const showVisitsAndModalities = false
  const selectedVisit = emptyVisit
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone dropzoneDisabled "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders disabled, no subjectId, dateTime not required, visits/modalities not required, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = ''
  const files: myFiles = []
  const dateTime = emptyDateTime
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = false
  const showVisitsAndModalities = false
  const selectedVisit = emptyVisit
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone dropzoneDisabled "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders disabled, dateTime not required, visits/modalities not required, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime = emptyDateTime
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = false
  const showVisitsAndModalities = false
  const selectedVisit = emptyVisit
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone  "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders disabled, dateTime required and not set, visits/modalities not required, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime = emptyDateTime
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = false
  const selectedVisit = emptyVisit
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone dropzoneDisabled "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders disabled, visits/modalities required, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: 'dateinput',
  }
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = emptyVisit
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone dropzoneDisabled "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders enabled, dateTime required, visits/modalities not required, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: 'dateinput',
  }
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = false
  const selectedVisit = emptyVisit
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone  "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders disabled, dateTime required, vists/modalities required, modality not selected, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: 'dateinput',
  }
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = { ...emptyVisit, key: '123' }
  const selectedModality = emptyModality
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone dropzoneDisabled "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders enabled, dateTime required, vists/modalities required, anon not begun', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: 'dateinput',
  }
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = { ...emptyVisit, key: '123' }
  const selectedModality = { ...emptyModality, key: '123' }
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone  "
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            
            <p
              className="dropzoneTopText"
            >
              Add a folder or zip archive.
            </p>
            <p
              className="dropzoneBottomText"
            >
              De-Identification process begins immediately.
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})

it('renders files being parsed, no info yet', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-07-22T12:58',
  }
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = 'dicomZipOrFolder'
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = { ...emptyVisit, key: '123' }
  const selectedModality = { ...emptyModality, key: '123' }
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <div
          className="anonInfo"
        >
          <svg
            aria-hidden={true}
            className="MuiSvgIcon-root icon"
            focusable="false"
            style={
              Object {
                "fontSize": 20,
              }
            }
            viewBox="0 0 24 24"
          >
            <path
              d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
            />
          </svg>
          <span>
             
            dicomZipOrFolder
             being loaded...
          </span>
          <div
            className="MuiBox-root MuiBox-root-1"
          >
            <div
              className="MuiBox-root MuiBox-root-2"
            >
              <div
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={0}
                className="MuiLinearProgress-root MuiLinearProgress-colorPrimary progressBar MuiLinearProgress-determinate"
                role="progressbar"
              >
                <div
                  className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate"
                  style={
                    Object {
                      "transform": "translateX(-100%)",
                    }
                  }
                />
              </div>
            </div>
            <div
              className="MuiBox-root MuiBox-root-3"
            >
              0
              %
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  `)
})

it('renders files being parsed, only totalFiles known', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-07-22T12:58',
  }
  const totalFiles = 10
  const numOfFilesParsed = 0
  const folderName = 'dicomZipOrFolder'
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = { ...emptyVisit, key: '123' }
  const selectedModality = { ...emptyModality, key: '123' }
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <div
          className="anonInfo"
        >
          <svg
            aria-hidden={true}
            className="MuiSvgIcon-root icon"
            focusable="false"
            style={
              Object {
                "fontSize": 20,
              }
            }
            viewBox="0 0 24 24"
          >
            <path
              d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
            />
          </svg>
          <span>
             
            10
             files in 
            dicomZipOrFolder
             - De-Identifying dicom files
          </span>
          <div
            className="MuiBox-root MuiBox-root-4"
          >
            <div
              className="MuiBox-root MuiBox-root-5"
            >
              <div
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={0}
                className="MuiLinearProgress-root MuiLinearProgress-colorPrimary progressBar MuiLinearProgress-determinate"
                role="progressbar"
              >
                <div
                  className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate"
                  style={
                    Object {
                      "transform": "translateX(-100%)",
                    }
                  }
                />
              </div>
            </div>
            <div
              className="MuiBox-root MuiBox-root-6"
            >
              0
              %
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  `)
})

it('renders files being parsed, file parsing in progress', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-07-22T12:58',
  }
  const totalFiles = 10
  const numOfFilesParsed = 4
  const folderName = 'dicomZipOrFolder'
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = { ...emptyVisit, key: '123' }
  const selectedModality = { ...emptyModality, key: '123' }
  const zipSizeError = ''

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <div
          className="anonInfo"
        >
          <svg
            aria-hidden={true}
            className="MuiSvgIcon-root icon"
            focusable="false"
            style={
              Object {
                "fontSize": 20,
              }
            }
            viewBox="0 0 24 24"
          >
            <path
              d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
            />
          </svg>
          <span>
             
            10
             files in 
            dicomZipOrFolder
             - De-Identifying dicom files
          </span>
          <div
            className="MuiBox-root MuiBox-root-7"
          >
            <div
              className="MuiBox-root MuiBox-root-8"
            >
              <div
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={40}
                className="MuiLinearProgress-root MuiLinearProgress-colorPrimary progressBar MuiLinearProgress-determinate"
                role="progressbar"
              >
                <div
                  className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate"
                  style={
                    Object {
                      "transform": "translateX(-60%)",
                    }
                  }
                />
              </div>
            </div>
            <div
              className="MuiBox-root MuiBox-root-9"
            >
              40
              %
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  `)
})

it('renders error text when zip file is too big', () => {
  const projectId = 'Dakota_project'
  const subjectId = 'Dakota'
  const files: myFiles = []
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-07-22T12:58',
  }
  const totalFiles = 0
  const numOfFilesParsed = 0
  const folderName = ''
  const isDateTimeInputRequired = true
  const showVisitsAndModalities = true
  const selectedVisit = { ...emptyVisit, key: '123' }
  const selectedModality = { ...emptyModality, key: '123' }
  const zipSizeError = 'zip was too big'

  const tree = renderer
    .create(
      <ImagingData
        projectId={projectId}
        subjectId={subjectId}
        key={1}
        files={files}
        dateTime={dateTime}
        onFileUpload={jest.fn()}
        totalFiles={totalFiles}
        numOfFilesParsed={numOfFilesParsed}
        folderName={folderName}
        discardDicomFiles={jest.fn()}
        isDateTimeInputRequired={isDateTimeInputRequired}
        showVisitsAndModalities={showVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        zipSizeError={zipSizeError}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
        style={
          Object {
            "paddingLeft": "2rem",
          }
        }
      >
        <label
          className="dropzoneLabel"
        >
          Imaging Files
          <span
            className="required"
          >
             *
          </span>
        </label>
        <section
          className="dropzone  zipSizeError"
        >
          <div
            onBlur={[Function]}
            onClick={[Function]}
            onDragEnter={[Function]}
            onDragLeave={[Function]}
            onDragOver={[Function]}
            onDrop={[Function]}
            onDropCapture={[Function]}
            onFocus={[Function]}
            onKeyDown={[Function]}
            tabIndex={0}
          >
            <input
              autoComplete="off"
              multiple={true}
              onChange={[Function]}
              onClick={[Function]}
              style={
                Object {
                  "display": "none",
                }
              }
              tabIndex={-1}
              type="file"
            />
            <p
              className="icon"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root icon themeBlue"
                focusable="false"
                style={
                  Object {
                    "fontSize": 50,
                  }
                }
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.17 6l2 2H20v10H4V6h5.17M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
                />
              </svg>
            </p>
            <p
              className="dropzoneTopText"
            >
              zip was too big
            </p>
            <p
              className="dropzoneTopText"
            >
              Please Drag and Drop its folder instead
            </p>
          </div>
        </section>
        <p
          className="infoText"
        >
          Imaging session date and time must match the DICOM for verification.
        </p>
        
      </div>
      <div />
    </div>
  `)
})
