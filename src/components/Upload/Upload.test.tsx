import renderer from 'react-test-renderer'
import Upload from './Upload'

jest.mock('../dedicated.worker', () => {
  return jest.fn()
})

describe('Upload.tsx ', () => {
  it('renders inital page load before anonScript and available projects are retrieved', () => {
    const anonScript = ''
    const availableProjects: Array<string> = []

    const tree = renderer
      .create(
        <Upload
          anonScript={anonScript}
          availableProjects={availableProjects}
          checkIfDateTimeRequired={jest.fn()}
          handleUploadFiles={jest.fn()}
          handleUploadPdf={jest.fn()}
          retrieveVisitsAndModalities={jest.fn()}
        />,
      )
      .toJSON()

    expect(tree).toMatchInlineSnapshot(`
      Array [
        <div
          className="MuiPaper-root MuiStepper-root MuiStepper-vertical MuiPaper-elevation0"
        >
          <div
            className="MuiStep-root MuiStep-vertical stepItem"
          >
            <span
              className="MuiStepLabel-root MuiStepLabel-vertical"
            >
              <span
                className="MuiStepLabel-iconContainer"
              >
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiStepIcon-root MuiStepIcon-active"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                  />
                  <text
                    className="MuiStepIcon-text"
                    textAnchor="middle"
                    x="12"
                    y="16"
                  >
                    1
                  </text>
                </svg>
              </span>
              <span
                className="MuiStepLabel-labelContainer"
              >
                <span
                  className="MuiTypography-root MuiStepLabel-label MuiStepLabel-active MuiTypography-body2 MuiTypography-displayBlock"
                >
                  Session Information
                </span>
              </span>
            </span>
            <div
              className="MuiStepContent-root"
              disabled={false}
              icon={1}
            >
              <div
                className="MuiCollapse-root MuiStepContent-transition MuiCollapse-entered"
                style={
                  Object {
                    "minHeight": "0px",
                  }
                }
              >
                <div
                  className="MuiCollapse-wrapper"
                >
                  <div
                    className="MuiCollapse-wrapperInner"
                  >
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
                    </form>
                    <div />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="MuiStepConnector-root MuiStepConnector-vertical MuiStepConnector-active Mui-disabled"
          >
            <span
              className="MuiStepConnector-line MuiStepConnector-lineVertical"
            />
          </div>
          <div
            className="MuiStep-root MuiStep-vertical stepItem"
          >
            <span
              className="MuiStepLabel-root MuiStepLabel-vertical Mui-disabled"
            >
              <span
                className="MuiStepLabel-iconContainer"
              >
                <svg
                  aria-hidden={true}
                  className="MuiSvgIcon-root MuiStepIcon-root MuiStepIcon-active"
                  focusable="false"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                  />
                  <text
                    className="MuiStepIcon-text"
                    textAnchor="middle"
                    x="12"
                    y="16"
                  >
                    2
                  </text>
                </svg>
              </span>
              <span
                className="MuiStepLabel-labelContainer"
              >
                <span
                  className="MuiTypography-root MuiStepLabel-label MuiStepLabel-active MuiTypography-body2 MuiTypography-displayBlock"
                >
                  Imaging Data
                </span>
              </span>
            </span>
            <div
              className="MuiStepContent-root"
              disabled={true}
              icon={2}
            >
              <div
                className="MuiCollapse-root MuiStepContent-transition MuiCollapse-entered"
                style={
                  Object {
                    "minHeight": "0px",
                  }
                }
              >
                <div
                  className="MuiCollapse-wrapper"
                >
                  <div
                    className="MuiCollapse-wrapperInner"
                  >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="MuiStepConnector-root MuiStepConnector-vertical MuiStepConnector-active Mui-disabled"
          >
            <span
              className="MuiStepConnector-line MuiStepConnector-lineVertical"
            />
          </div>
          <div
            className="MuiStep-root MuiStep-vertical stepItem"
          >
            <div
              className="MuiStepContent-root MuiStepContent-last"
              disabled={true}
              icon={3}
            >
              <div
                className="MuiCollapse-root MuiStepContent-transition MuiCollapse-entered"
                style={
                  Object {
                    "minHeight": "0px",
                  }
                }
              >
                <div
                  className="MuiCollapse-wrapper"
                >
                  <div
                    className="MuiCollapse-wrapperInner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>,
        <div
          className="MuiPaper-root pageFooter MuiPaper-elevation0"
        >
          <div
            className="MuiContainer-root MuiContainer-maxWidthLg"
          >
            <div
              className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 MuiGrid-justify-content-xs-flex-end"
            >
              <div
                className="MuiGrid-root MuiGrid-item"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained uploadSubjectData Mui-disabled Mui-disabled"
                  disabled={true}
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
                  tabIndex={-1}
                  type="button"
                >
                  <span
                    className="MuiButton-label"
                  >
                    Upload Subject Data
                  </span>
                </button>
              </div>
              <div
                className="MuiGrid-root MuiGrid-item"
              >
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-outlined resetAllData"
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
                    Reset
                  </span>
                  <span
                    className="MuiTouchRipple-root"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>,
      ]
    `)
  })
})

it('renders after anon script and project list has been retrieved', () => {
  const anonScript = 'my cool script'
  const availableProjects: Array<string> = ['project 1', 'project 2']

  const tree = renderer
    .create(
      <Upload
        anonScript={anonScript}
        availableProjects={availableProjects}
        checkIfDateTimeRequired={jest.fn()}
        handleUploadFiles={jest.fn()}
        handleUploadPdf={jest.fn()}
        retrieveVisitsAndModalities={jest.fn()}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    Array [
      <div
        className="MuiPaper-root MuiStepper-root MuiStepper-vertical MuiPaper-elevation0"
      >
        <div
          className="MuiStep-root MuiStep-vertical stepItem"
        >
          <span
            className="MuiStepLabel-root MuiStepLabel-vertical"
          >
            <span
              className="MuiStepLabel-iconContainer"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root MuiStepIcon-root MuiStepIcon-active"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="12"
                />
                <text
                  className="MuiStepIcon-text"
                  textAnchor="middle"
                  x="12"
                  y="16"
                >
                  1
                </text>
              </svg>
            </span>
            <span
              className="MuiStepLabel-labelContainer"
            >
              <span
                className="MuiTypography-root MuiStepLabel-label MuiStepLabel-active MuiTypography-body2 MuiTypography-displayBlock"
              >
                Session Information
              </span>
            </span>
          </span>
          <div
            className="MuiStepContent-root"
            disabled={false}
            icon={1}
          >
            <div
              className="MuiCollapse-root MuiStepContent-transition MuiCollapse-entered"
              style={
                Object {
                  "minHeight": "0px",
                }
              }
            >
              <div
                className="MuiCollapse-wrapper"
              >
                <div
                  className="MuiCollapse-wrapperInner"
                >
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
                  </form>
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiStepConnector-root MuiStepConnector-vertical MuiStepConnector-active Mui-disabled"
        >
          <span
            className="MuiStepConnector-line MuiStepConnector-lineVertical"
          />
        </div>
        <div
          className="MuiStep-root MuiStep-vertical stepItem"
        >
          <span
            className="MuiStepLabel-root MuiStepLabel-vertical Mui-disabled"
          >
            <span
              className="MuiStepLabel-iconContainer"
            >
              <svg
                aria-hidden={true}
                className="MuiSvgIcon-root MuiStepIcon-root MuiStepIcon-active"
                focusable="false"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="12"
                />
                <text
                  className="MuiStepIcon-text"
                  textAnchor="middle"
                  x="12"
                  y="16"
                >
                  2
                </text>
              </svg>
            </span>
            <span
              className="MuiStepLabel-labelContainer"
            >
              <span
                className="MuiTypography-root MuiStepLabel-label MuiStepLabel-active MuiTypography-body2 MuiTypography-displayBlock"
              >
                Imaging Data
              </span>
            </span>
          </span>
          <div
            className="MuiStepContent-root"
            disabled={true}
            icon={2}
          >
            <div
              className="MuiCollapse-root MuiStepContent-transition MuiCollapse-entered"
              style={
                Object {
                  "minHeight": "0px",
                }
              }
            >
              <div
                className="MuiCollapse-wrapper"
              >
                <div
                  className="MuiCollapse-wrapperInner"
                >
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="MuiStepConnector-root MuiStepConnector-vertical MuiStepConnector-active Mui-disabled"
        >
          <span
            className="MuiStepConnector-line MuiStepConnector-lineVertical"
          />
        </div>
        <div
          className="MuiStep-root MuiStep-vertical stepItem"
        >
          <div
            className="MuiStepContent-root MuiStepContent-last"
            disabled={true}
            icon={3}
          >
            <div
              className="MuiCollapse-root MuiStepContent-transition MuiCollapse-entered"
              style={
                Object {
                  "minHeight": "0px",
                }
              }
            >
              <div
                className="MuiCollapse-wrapper"
              >
                <div
                  className="MuiCollapse-wrapperInner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>,
      <div
        className="MuiPaper-root pageFooter MuiPaper-elevation0"
      >
        <div
          className="MuiContainer-root MuiContainer-maxWidthLg"
        >
          <div
            className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3 MuiGrid-justify-content-xs-flex-end"
          >
            <div
              className="MuiGrid-root MuiGrid-item"
            >
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained uploadSubjectData Mui-disabled Mui-disabled"
                disabled={true}
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
                tabIndex={-1}
                type="button"
              >
                <span
                  className="MuiButton-label"
                >
                  Upload Subject Data
                </span>
              </button>
            </div>
            <div
              className="MuiGrid-root MuiGrid-item"
            >
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-outlined resetAllData"
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
                  Reset
                </span>
                <span
                  className="MuiTouchRipple-root"
                />
              </button>
            </div>
          </div>
        </div>
      </div>,
    ]
  `)
})
