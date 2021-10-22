import renderer from 'react-test-renderer'
import {
  dateTimeProps,
  emptyDateTime,
  emptyModality,
  emptyVisit,
  modalityProps,
  visitProps,
  visitsAndModaltiesProps,
} from '../../myTypes'
import SessionInformation from './SessionInformation'

describe('SessionInformation.tsx ', () => {
  it('renders before project options have been retrieved, hides date-time, hides visit & modality', () => {
    const subjectId = ''
    const projectId = ''
    const dateTime: dateTimeProps = emptyDateTime
    const availableProjects: Array<string> = []
    const showVisitsAndModalities = false
    const availableVisitsAndModalities: visitsAndModaltiesProps = []
    const selectedVisit: visitProps = emptyVisit
    const selectedModality: modalityProps = emptyModality
    const pdfFile: File | null = null
    const isDateTimeInputRequired = false
    const pdfModalOpen = false

    const tree = renderer
      .create(
        <SessionInformation
          projectId={projectId}
          subjectId={subjectId}
          dateTime={dateTime}
          availableProjects={availableProjects}
          showVisitsAndModalities={showVisitsAndModalities}
          availableVisitsAndModalities={availableVisitsAndModalities}
          selectedVisit={selectedVisit}
          selectedModality={selectedModality}
          pdfFile={pdfFile}
          isDateTimeInputRequired={isDateTimeInputRequired}
          pdfModalOpen={pdfModalOpen}
          onProjectChange={jest.fn()}
          setSubjectId={jest.fn()}
          setDateTime={jest.fn()}
          setVisit={jest.fn()}
          setModality={jest.fn()}
          onPdfUpload={jest.fn()}
          onPdfDiscard={jest.fn()}
          setPdfModalOpen={jest.fn()}
        />,
      )
      .toJSON()

    expect(tree).toMatchInlineSnapshot(`
      Array [
        <form
          autoComplete="off"
          className="inputPadding stepperStep"
          noValidate={true}
        >
          <div
            className="MuiGrid-root gridContainer MuiGrid-container"
          >
            <div
              className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
            >
              <div
                className="MuiFormControl-root MuiFormControl-fullWidth"
              >
                <label
                  className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                  data-shrink={true}
                  id="project-label"
                >
                  Performance Site ID 
                  <span
                    className="required"
                  >
                     *
                  </span>
                  <svg
                    aria-describedby={null}
                    aria-hidden={true}
                    className="MuiSvgIcon-root helpIcon"
                    focusable="false"
                    onBlur={[Function]}
                    onFocus={[Function]}
                    onMouseLeave={[Function]}
                    onMouseOver={[Function]}
                    onTouchEnd={[Function]}
                    onTouchStart={[Function]}
                    title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                    />
                  </svg>
                </label>
                <div
                  className="MuiInputBase-root MuiOutlinedInput-root Mui-disabled Mui-disabled MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                  onClick={[Function]}
                >
                  <div
                    aria-disabled="true"
                    aria-haspopup="listbox"
                    aria-labelledby="project-label"
                    className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input Mui-disabled Mui-disabled MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense Mui-disabled"
                    onBlur={[Function]}
                    onFocus={[Function]}
                    onKeyDown={[Function]}
                    onMouseDown={null}
                    role="button"
                    tabIndex={null}
                  >
                    Loading Projects...
                  </div>
                  <input
                    aria-hidden={true}
                    className="MuiSelect-nativeInput"
                    onAnimationStart={[Function]}
                    onChange={[Function]}
                    required={false}
                    tabIndex={-1}
                    value=""
                  />
                  <svg
                    aria-hidden={true}
                    className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined Mui-disabled"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 10l5 5 5-5z"
                    />
                  </svg>
                  <fieldset
                    aria-hidden={true}
                    className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                    style={
                      Object {
                        "paddingLeft": 8,
                      }
                    }
                  >
                    <legend
                      className="PrivateNotchedOutline-legend-2"
                      style={
                        Object {
                          "width": 0.01,
                        }
                      }
                    >
                      <span
                        dangerouslySetInnerHTML={
                          Object {
                            "__html": "&#8203;",
                          }
                        }
                      />
                    </legend>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <div
            className="MuiGrid-root MuiGrid-container"
          >
            <div
              className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
            >
              <div
                className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
              >
                <label
                  className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                  data-shrink={true}
                  htmlFor="subject"
                  id="subject-label"
                  style={
                    Object {
                      "pointerEvents": "auto",
                    }
                  }
                >
                  Subject ID 
                  <span
                    className="required"
                  >
                     *
                  </span>
                  <svg
                    aria-describedby={null}
                    aria-hidden={true}
                    className="MuiSvgIcon-root helpIcon"
                    focusable="false"
                    onBlur={[Function]}
                    onFocus={[Function]}
                    onMouseLeave={[Function]}
                    onMouseOver={[Function]}
                    onTouchEnd={[Function]}
                    onTouchStart={[Function]}
                    title="Enter the Subject ID as noted on the metadata form"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                    />
                  </svg>
                </label>
                <div
                  className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                  onClick={[Function]}
                >
                  <input
                    aria-invalid={false}
                    autoFocus={false}
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                    disabled={false}
                    id="subject"
                    onAnimationStart={[Function]}
                    onBlur={[Function]}
                    onChange={[Function]}
                    onFocus={[Function]}
                    required={false}
                    type="text"
                    value=""
                  />
                  <fieldset
                    aria-hidden={true}
                    className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  >
                    <legend
                      className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                    >
                      <span>
                        Subject ID 
                        <span
                          className="required"
                        >
                           *
                        </span>
                        <svg
                          aria-describedby={null}
                          aria-hidden={true}
                          className="MuiSvgIcon-root helpIcon"
                          focusable="false"
                          onBlur={[Function]}
                          onFocus={[Function]}
                          onMouseLeave={[Function]}
                          onMouseOver={[Function]}
                          onTouchEnd={[Function]}
                          onTouchStart={[Function]}
                          title="Enter the Subject ID as noted on the metadata form"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                          />
                        </svg>
                      </span>
                    </legend>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
          <div
            className="MuiGrid-root MuiGrid-container"
          >
            <div
              className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
            >
              <label
                className="dropzoneLabel"
              >
                Metadata Form
                <span
                  className="required"
                >
                   *
                </span>
              </label>
              <section
                className="dropzone"
              >
                <div
                  onBlur={[Function]}
                  onClick={[Function]}
                  onDragEnter={[Function]}
                  onDragLeave={[Function]}
                  onDragOver={[Function]}
                  onDrop={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  tabIndex={0}
                >
                  <input
                    accept=".pdf"
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
                        d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                      />
                    </svg>
                  </p>
                  <p
                    className="dropzoneText"
                  >
                    Attach Metadata Form
                  </p>
                </div>
              </section>
              <p
                className="pdfOnly"
              >
                Only PDF files accepted
              </p>
            </div>
          </div>
        </form>,
        <div />,
      ]
    `)
  })
})

it('renders after project options have been retrieved, hides date-time, hides visit & modality', () => {
  const subjectId = ''
  const projectId = ''
  const dateTime: dateTimeProps = emptyDateTime
  const availableProjects: Array<string> = ['project 1', 'project 2']
  const showVisitsAndModalities = false
  const availableVisitsAndModalities: visitsAndModaltiesProps = []
  const selectedVisit: visitProps = emptyVisit
  const selectedModality: modalityProps = emptyModality
  const pdfFile: File | null = null
  const isDateTimeInputRequired = false
  const pdfModalOpen = false

  const tree = renderer
    .create(
      <SessionInformation
        projectId={projectId}
        subjectId={subjectId}
        dateTime={dateTime}
        availableProjects={availableProjects}
        showVisitsAndModalities={showVisitsAndModalities}
        availableVisitsAndModalities={availableVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        pdfFile={pdfFile}
        isDateTimeInputRequired={isDateTimeInputRequired}
        pdfModalOpen={pdfModalOpen}
        onProjectChange={jest.fn()}
        setSubjectId={jest.fn()}
        setDateTime={jest.fn()}
        setVisit={jest.fn()}
        setModality={jest.fn()}
        onPdfUpload={jest.fn()}
        onPdfDiscard={jest.fn()}
        setPdfModalOpen={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <form
        autoComplete="off"
        className="inputPadding stepperStep"
        noValidate={true}
      >
        <div
          className="MuiGrid-root gridContainer MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                id="project-label"
              >
                Performance Site ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-haspopup="listbox"
                  aria-labelledby="project-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  Select Performance Site
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value=""
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="subject"
                id="subject-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Subject ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Subject ID as noted on the metadata form"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="subject"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="text"
                  value=""
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Subject ID 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the Subject ID as noted on the metadata form"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <label
              className="dropzoneLabel"
            >
              Metadata Form
              <span
                className="required"
              >
                 *
              </span>
            </label>
            <section
              className="dropzone"
            >
              <div
                onBlur={[Function]}
                onClick={[Function]}
                onDragEnter={[Function]}
                onDragLeave={[Function]}
                onDragOver={[Function]}
                onDrop={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                tabIndex={0}
              >
                <input
                  accept=".pdf"
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
                      d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                    />
                  </svg>
                </p>
                <p
                  className="dropzoneText"
                >
                  Attach Metadata Form
                </p>
              </div>
            </section>
            <p
              className="pdfOnly"
            >
              Only PDF files accepted
            </p>
          </div>
        </div>
      </form>,
      <div />,
    ]
  `)
})

it('renders projectId and subjectId value, hides date-time, hides visit & modality', () => {
  const subjectId = 'Dakota'
  const projectId = 'project 1'
  const dateTime: dateTimeProps = emptyDateTime
  const availableProjects: Array<string> = ['project 1', 'project 2']
  const showVisitsAndModalities = false
  const availableVisitsAndModalities: visitsAndModaltiesProps = []
  const selectedVisit: visitProps = emptyVisit
  const selectedModality: modalityProps = emptyModality
  const pdfFile: File | null = null
  const isDateTimeInputRequired = false
  const pdfModalOpen = false

  const tree = renderer
    .create(
      <SessionInformation
        projectId={projectId}
        subjectId={subjectId}
        dateTime={dateTime}
        availableProjects={availableProjects}
        showVisitsAndModalities={showVisitsAndModalities}
        availableVisitsAndModalities={availableVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        pdfFile={pdfFile}
        isDateTimeInputRequired={isDateTimeInputRequired}
        pdfModalOpen={pdfModalOpen}
        onProjectChange={jest.fn()}
        setSubjectId={jest.fn()}
        setDateTime={jest.fn()}
        setVisit={jest.fn()}
        setModality={jest.fn()}
        onPdfUpload={jest.fn()}
        onPdfDiscard={jest.fn()}
        setPdfModalOpen={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <form
        autoComplete="off"
        className="inputPadding stepperStep"
        noValidate={true}
      >
        <div
          className="MuiGrid-root gridContainer MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined MuiFormLabel-filled"
                data-shrink={true}
                id="project-label"
              >
                Performance Site ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-haspopup="listbox"
                  aria-labelledby="project-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  project 1
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value="project 1"
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="subject"
                id="subject-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Subject ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Subject ID as noted on the metadata form"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="subject"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="text"
                  value="Dakota"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Subject ID 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the Subject ID as noted on the metadata form"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <label
              className="dropzoneLabel"
            >
              Metadata Form
              <span
                className="required"
              >
                 *
              </span>
            </label>
            <section
              className="dropzone"
            >
              <div
                onBlur={[Function]}
                onClick={[Function]}
                onDragEnter={[Function]}
                onDragLeave={[Function]}
                onDragOver={[Function]}
                onDrop={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                tabIndex={0}
              >
                <input
                  accept=".pdf"
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
                      d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                    />
                  </svg>
                </p>
                <p
                  className="dropzoneText"
                >
                  Attach Metadata Form
                </p>
              </div>
            </section>
            <p
              className="pdfOnly"
            >
              Only PDF files accepted
            </p>
          </div>
        </div>
      </form>,
      <div />,
    ]
  `)
})

it('renders after project selection, subjectId entered, shows dateTime, hides visit & modality', () => {
  const subjectId = 'Dakota'
  const projectId = 'project 1'
  const dateTime: dateTimeProps = emptyDateTime
  const availableProjects: Array<string> = ['project 1', 'project 2']
  const showVisitsAndModalities = false
  const availableVisitsAndModalities: visitsAndModaltiesProps = []
  const selectedVisit: visitProps = emptyVisit
  const selectedModality: modalityProps = emptyModality
  const pdfFile: File | null = null
  const isDateTimeInputRequired = true
  const pdfModalOpen = false

  const tree = renderer
    .create(
      <SessionInformation
        projectId={projectId}
        subjectId={subjectId}
        dateTime={dateTime}
        availableProjects={availableProjects}
        showVisitsAndModalities={showVisitsAndModalities}
        availableVisitsAndModalities={availableVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        pdfFile={pdfFile}
        isDateTimeInputRequired={isDateTimeInputRequired}
        pdfModalOpen={pdfModalOpen}
        onProjectChange={jest.fn()}
        setSubjectId={jest.fn()}
        setDateTime={jest.fn()}
        setVisit={jest.fn()}
        setModality={jest.fn()}
        onPdfUpload={jest.fn()}
        onPdfDiscard={jest.fn()}
        setPdfModalOpen={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <form
        autoComplete="off"
        className="inputPadding stepperStep"
        noValidate={true}
      >
        <div
          className="MuiGrid-root gridContainer MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined MuiFormLabel-filled"
                data-shrink={true}
                id="project-label"
              >
                Performance Site ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-haspopup="listbox"
                  aria-labelledby="project-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  project 1
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value="project 1"
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="subject"
                id="subject-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Subject ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Subject ID as noted on the metadata form"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="subject"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="text"
                  value="Dakota"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Subject ID 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the Subject ID as noted on the metadata form"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldDatetimeLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="datetime-local"
                id="datetime-local-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Imaging Session Date and Time 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the date and time as noted in the DICOM for study verification"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="datetime-local"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="datetime-local"
                  value=""
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Imaging Session Date and Time 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the date and time as noted in the DICOM for study verification"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <label
              className="dropzoneLabel"
            >
              Metadata Form
              <span
                className="required"
              >
                 *
              </span>
            </label>
            <section
              className="dropzone"
            >
              <div
                onBlur={[Function]}
                onClick={[Function]}
                onDragEnter={[Function]}
                onDragLeave={[Function]}
                onDragOver={[Function]}
                onDrop={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                tabIndex={0}
              >
                <input
                  accept=".pdf"
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
                      d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                    />
                  </svg>
                </p>
                <p
                  className="dropzoneText"
                >
                  Attach Metadata Form
                </p>
              </div>
            </section>
            <p
              className="pdfOnly"
            >
              Only PDF files accepted
            </p>
          </div>
        </div>
      </form>,
      <div />,
    ]
  `)
})

it('renders after project selection, subjectId entered, dateTime selected, hides visit & modality', () => {
  const subjectId = 'Dakota'
  const projectId = 'project 1'
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-10-22T09:58',
  }
  const availableProjects: Array<string> = ['project 1', 'project 2']
  const showVisitsAndModalities = false
  const availableVisitsAndModalities: visitsAndModaltiesProps = []
  const selectedVisit: visitProps = emptyVisit
  const selectedModality: modalityProps = emptyModality
  const pdfFile: File | null = null
  const isDateTimeInputRequired = true
  const pdfModalOpen = false

  const tree = renderer
    .create(
      <SessionInformation
        projectId={projectId}
        subjectId={subjectId}
        dateTime={dateTime}
        availableProjects={availableProjects}
        showVisitsAndModalities={showVisitsAndModalities}
        availableVisitsAndModalities={availableVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        pdfFile={pdfFile}
        isDateTimeInputRequired={isDateTimeInputRequired}
        pdfModalOpen={pdfModalOpen}
        onProjectChange={jest.fn()}
        setSubjectId={jest.fn()}
        setDateTime={jest.fn()}
        setVisit={jest.fn()}
        setModality={jest.fn()}
        onPdfUpload={jest.fn()}
        onPdfDiscard={jest.fn()}
        setPdfModalOpen={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <form
        autoComplete="off"
        className="inputPadding stepperStep"
        noValidate={true}
      >
        <div
          className="MuiGrid-root gridContainer MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined MuiFormLabel-filled"
                data-shrink={true}
                id="project-label"
              >
                Performance Site ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-haspopup="listbox"
                  aria-labelledby="project-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  project 1
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value="project 1"
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="subject"
                id="subject-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Subject ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Subject ID as noted on the metadata form"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="subject"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="text"
                  value="Dakota"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Subject ID 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the Subject ID as noted on the metadata form"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldDatetimeLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="datetime-local"
                id="datetime-local-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Imaging Session Date and Time 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the date and time as noted in the DICOM for study verification"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="datetime-local"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="datetime-local"
                  value="2021-10-22T09:58"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Imaging Session Date and Time 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the date and time as noted in the DICOM for study verification"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <label
              className="dropzoneLabel"
            >
              Metadata Form
              <span
                className="required"
              >
                 *
              </span>
            </label>
            <section
              className="dropzone"
            >
              <div
                onBlur={[Function]}
                onClick={[Function]}
                onDragEnter={[Function]}
                onDragLeave={[Function]}
                onDragOver={[Function]}
                onDrop={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                tabIndex={0}
              >
                <input
                  accept=".pdf"
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
                      d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                    />
                  </svg>
                </p>
                <p
                  className="dropzoneText"
                >
                  Attach Metadata Form
                </p>
              </div>
            </section>
            <p
              className="pdfOnly"
            >
              Only PDF files accepted
            </p>
          </div>
        </div>
      </form>,
      <div />,
    ]
  `)
})

it('renders after project selection, subjectId entered, dateTime selected, shows visit & modality', () => {
  const subjectId = 'Dakota'
  const projectId = 'project 1'
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-10-22T09:58',
  }
  const availableProjects: Array<string> = ['project 1', 'project 2']
  const showVisitsAndModalities = true
  const availableVisitsAndModalities: visitsAndModaltiesProps = []
  const selectedVisit: visitProps = emptyVisit
  const selectedModality: modalityProps = emptyModality
  const pdfFile: File | null = null
  const isDateTimeInputRequired = true
  const pdfModalOpen = false

  const tree = renderer
    .create(
      <SessionInformation
        projectId={projectId}
        subjectId={subjectId}
        dateTime={dateTime}
        availableProjects={availableProjects}
        showVisitsAndModalities={showVisitsAndModalities}
        availableVisitsAndModalities={availableVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        pdfFile={pdfFile}
        isDateTimeInputRequired={isDateTimeInputRequired}
        pdfModalOpen={pdfModalOpen}
        onProjectChange={jest.fn()}
        setSubjectId={jest.fn()}
        setDateTime={jest.fn()}
        setVisit={jest.fn()}
        setModality={jest.fn()}
        onPdfUpload={jest.fn()}
        onPdfDiscard={jest.fn()}
        setPdfModalOpen={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <form
        autoComplete="off"
        className="inputPadding stepperStep"
        noValidate={true}
      >
        <div
          className="MuiGrid-root gridContainer MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined MuiFormLabel-filled"
                data-shrink={true}
                id="project-label"
              >
                Performance Site ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-haspopup="listbox"
                  aria-labelledby="project-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  project 1
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value="project 1"
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="subject"
                id="subject-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Subject ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Subject ID as noted on the metadata form"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="subject"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="text"
                  value="Dakota"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Subject ID 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the Subject ID as noted on the metadata form"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldDatetimeLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="datetime-local"
                id="datetime-local-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Imaging Session Date and Time 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the date and time as noted in the DICOM for study verification"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="datetime-local"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="datetime-local"
                  value="2021-10-22T09:58"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Imaging Session Date and Time 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the date and time as noted in the DICOM for study verification"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                id="visit-label"
              >
                Imaging Session Visit 
                 
                <span
                  className="required"
                >
                   *
                </span>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root Mui-disabled Mui-disabled MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-disabled="true"
                  aria-haspopup="listbox"
                  aria-labelledby="visit-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input Mui-disabled Mui-disabled MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense Mui-disabled"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={null}
                  role="button"
                  tabIndex={null}
                >
                  Select Visit
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value=""
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined Mui-disabled"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                id="modality-label"
              >
                Modality 
                 
                <span
                  className="required"
                >
                   *
                </span>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root Mui-disabled Mui-disabled MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-disabled="true"
                  aria-haspopup="listbox"
                  aria-labelledby="modality-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input Mui-disabled Mui-disabled MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense Mui-disabled"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={null}
                  role="button"
                  tabIndex={null}
                >
                  Select Modality
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value=""
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined Mui-disabled"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <label
              className="dropzoneLabel"
            >
              Metadata Form
              <span
                className="required"
              >
                 *
              </span>
            </label>
            <section
              className="dropzone"
            >
              <div
                onBlur={[Function]}
                onClick={[Function]}
                onDragEnter={[Function]}
                onDragLeave={[Function]}
                onDragOver={[Function]}
                onDrop={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                tabIndex={0}
              >
                <input
                  accept=".pdf"
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
                      d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                    />
                  </svg>
                </p>
                <p
                  className="dropzoneText"
                >
                  Attach Metadata Form
                </p>
              </div>
            </section>
            <p
              className="pdfOnly"
            >
              Only PDF files accepted
            </p>
          </div>
        </div>
      </form>,
      <div />,
    ]
  `)
})

it('renders after pdf successfully loaded to page', () => {
  const subjectId = 'Dakota'
  const projectId = 'project 1'
  const dateTime: dateTimeProps = {
    ...emptyDateTime,
    rawinputValue: '2021-10-22T09:58',
  }
  const availableProjects: Array<string> = ['project 1', 'project 2']
  const showVisitsAndModalities = false
  const availableVisitsAndModalities: visitsAndModaltiesProps = []
  const selectedVisit: visitProps = emptyVisit
  const selectedModality: modalityProps = emptyModality
  const pdfFile: File | null = { name: 'dummy.pdf' } as File
  const isDateTimeInputRequired = false
  const pdfModalOpen = false

  const tree = renderer
    .create(
      <SessionInformation
        projectId={projectId}
        subjectId={subjectId}
        dateTime={dateTime}
        availableProjects={availableProjects}
        showVisitsAndModalities={showVisitsAndModalities}
        availableVisitsAndModalities={availableVisitsAndModalities}
        selectedVisit={selectedVisit}
        selectedModality={selectedModality}
        pdfFile={pdfFile}
        isDateTimeInputRequired={isDateTimeInputRequired}
        pdfModalOpen={pdfModalOpen}
        onProjectChange={jest.fn()}
        setSubjectId={jest.fn()}
        setDateTime={jest.fn()}
        setVisit={jest.fn()}
        setModality={jest.fn()}
        onPdfUpload={jest.fn()}
        onPdfDiscard={jest.fn()}
        setPdfModalOpen={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <form
        autoComplete="off"
        className="inputPadding stepperStep"
        noValidate={true}
      >
        <div
          className="MuiGrid-root gridContainer MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root projectInputLabel boldMenuLabel MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined MuiFormLabel-filled"
                data-shrink={true}
                id="project-label"
              >
                Performance Site ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Performance Site ID as shown on the metadata form e.g. DIANTU_###_##"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <div
                  aria-haspopup="listbox"
                  aria-labelledby="project-label"
                  className="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onKeyDown={[Function]}
                  onMouseDown={[Function]}
                  role="button"
                  tabIndex={0}
                >
                  project 1
                </div>
                <input
                  aria-hidden={true}
                  className="MuiSelect-nativeInput"
                  onAnimationStart={[Function]}
                  onChange={[Function]}
                  required={false}
                  tabIndex={-1}
                  value="project 1"
                />
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiSelect-icon MuiSelect-iconOutlined"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M7 10l5 5 5-5z"
                  />
                </svg>
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                  style={
                    Object {
                      "paddingLeft": 8,
                    }
                  }
                >
                  <legend
                    className="PrivateNotchedOutline-legend-2"
                    style={
                      Object {
                        "width": 0.01,
                      }
                    }
                  >
                    <span
                      dangerouslySetInnerHTML={
                        Object {
                          "__html": "&#8203;",
                        }
                      }
                    />
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <div
              className="MuiFormControl-root MuiTextField-root boldInputLabel MuiFormControl-fullWidth"
            >
              <label
                className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-marginDense MuiInputLabel-outlined"
                data-shrink={true}
                htmlFor="subject"
                id="subject-label"
                style={
                  Object {
                    "pointerEvents": "auto",
                  }
                }
              >
                Subject ID 
                <span
                  className="required"
                >
                   *
                </span>
                <svg
                  aria-describedby={null}
                  aria-hidden={true}
                  className="MuiSvgIcon-root helpIcon"
                  focusable="false"
                  onBlur={[Function]}
                  onFocus={[Function]}
                  onMouseLeave={[Function]}
                  onMouseOver={[Function]}
                  onTouchEnd={[Function]}
                  onTouchStart={[Function]}
                  title="Enter the Subject ID as noted on the metadata form"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                  />
                </svg>
              </label>
              <div
                className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-marginDense MuiOutlinedInput-marginDense"
                onClick={[Function]}
              >
                <input
                  aria-invalid={false}
                  autoFocus={false}
                  className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputMarginDense MuiOutlinedInput-inputMarginDense"
                  disabled={false}
                  id="subject"
                  onAnimationStart={[Function]}
                  onBlur={[Function]}
                  onChange={[Function]}
                  onFocus={[Function]}
                  required={false}
                  type="text"
                  value="Dakota"
                />
                <fieldset
                  aria-hidden={true}
                  className="PrivateNotchedOutline-root-1 MuiOutlinedInput-notchedOutline"
                >
                  <legend
                    className="PrivateNotchedOutline-legendLabelled-3 PrivateNotchedOutline-legendNotched-4"
                  >
                    <span>
                      Subject ID 
                      <span
                        className="required"
                      >
                         *
                      </span>
                      <svg
                        aria-describedby={null}
                        aria-hidden={true}
                        className="MuiSvgIcon-root helpIcon"
                        focusable="false"
                        onBlur={[Function]}
                        onFocus={[Function]}
                        onMouseLeave={[Function]}
                        onMouseOver={[Function]}
                        onTouchEnd={[Function]}
                        onTouchStart={[Function]}
                        title="Enter the Subject ID as noted on the metadata form"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                        />
                      </svg>
                    </span>
                  </legend>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiGrid-root MuiGrid-container"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-5"
          >
            <label
              className="dropzoneLabel"
            >
              Metadata Form
              <span
                className="required"
              >
                 *
              </span>
            </label>
            <div
              className="pdfInfo"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root themeBlue"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <path
                  d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                />
              </svg>
              <span
                className="pdfFileName"
              >
                dummy.pdf
              </span>
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-outlined pdfDiscardButton"
                disabled={false}
                onBlur={[Function]}
                onClick={[Function]}
                onDragLeave={[Function]}
                onFocus={[Function]}
                onKeyDown={[Function]}
                onKeyUp={[Function]}
                onMouseDown={[Function]}
                onMouseLeave={[Function]}
                onMouseUp={[Function]}
                onTouchEnd={[Function]}
                onTouchMove={[Function]}
                onTouchStart={[Function]}
                style={
                  Object {
                    "textTransform": "none",
                  }
                }
                tabIndex={0}
                type="button"
              >
                <span
                  className="MuiButton-label"
                >
                  Discard
                </span>
                <span
                  className="MuiTouchRipple-root"
                />
              </button>
            </div>
          </div>
        </div>
      </form>,
      <div />,
    ]
  `)
})
