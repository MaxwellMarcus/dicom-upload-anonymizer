import renderer from 'react-test-renderer'
import { uploadProgressProps } from '../../myTypes'
import PageFooter from './PageFooter'

it('renders upload button disabled, reset button, upload not in progress', () => {
  const readyToUpload = false
  const sendingFiles = false
  const uploadProgress: uploadProgressProps = {
    chunksSent: 0,
    totalNumberOfChunks: 0,
  }

  const tree = renderer
    .create(
      <PageFooter
        onSubmit={jest.fn()}
        readyToUpload={readyToUpload}
        resetAllData={jest.fn()}
        sendingFiles={sendingFiles}
        uploadProgress={uploadProgress}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
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
            </button>
          </div>
        </div>
      </div>
    </div>
  `)
})

it('renders upload button enabled, reset button, upload not in progress', () => {
  const readyToUpload = true
  const sendingFiles = false
  const uploadProgress: uploadProgressProps = {
    chunksSent: 0,
    totalNumberOfChunks: 0,
  }

  const tree = renderer
    .create(
      <PageFooter
        onSubmit={jest.fn()}
        readyToUpload={readyToUpload}
        resetAllData={jest.fn()}
        sendingFiles={sendingFiles}
        uploadProgress={uploadProgress}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
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
              className="MuiButtonBase-root MuiButton-root MuiButton-contained uploadSubjectData"
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
                Upload Subject Data
              </span>
              <span
                className="MuiTouchRipple-root"
              />
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
    </div>
  `)
})

it('renders the upload progress bar at 0% as upload kicks off', () => {
  const readyToUpload = true
  const sendingFiles = true
  const uploadProgress: uploadProgressProps = {
    chunksSent: 0,
    totalNumberOfChunks: 10,
  }

  const tree = renderer
    .create(
      <PageFooter
        onSubmit={jest.fn()}
        readyToUpload={readyToUpload}
        resetAllData={jest.fn()}
        sendingFiles={sendingFiles}
        uploadProgress={uploadProgress}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
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
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"
          >
            <p
              className="progressText"
            >
              Uploading Anonymized Imaging Files and Metadata Form
            </p>
            <div
              className="MuiBox-root MuiBox-root-1"
            >
              <div
                className="MuiBox-root MuiBox-root-2"
              >
                0
                %
              </div>
              <div
                className="MuiBox-root MuiBox-root-3"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
})

it('renders the upload progress bar part way throuh data upload', () => {
  const readyToUpload = true
  const sendingFiles = true
  const uploadProgress: uploadProgressProps = {
    chunksSent: 4,
    totalNumberOfChunks: 10,
  }

  const tree = renderer
    .create(
      <PageFooter
        onSubmit={jest.fn()}
        readyToUpload={readyToUpload}
        resetAllData={jest.fn()}
        sendingFiles={sendingFiles}
        uploadProgress={uploadProgress}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiPaper-root pageFooter MuiPaper-elevation0"
    >
      <div
        className="MuiContainer-root MuiContainer-maxWidthLg"
      >
        <div
          className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"
          >
            <p
              className="progressText"
            >
              Uploading Anonymized Imaging Files and Metadata Form
            </p>
            <div
              className="MuiBox-root MuiBox-root-4"
            >
              <div
                className="MuiBox-root MuiBox-root-5"
              >
                40
                %
              </div>
              <div
                className="MuiBox-root MuiBox-root-6"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  `)
})

it('renders progress bar and New Upload button when uplooad is complete', () => {
  const readyToUpload = true
  const sendingFiles = false
  const uploadProgress: uploadProgressProps = {
    chunksSent: 10,
    totalNumberOfChunks: 10,
  }

  const tree = renderer
    .create(
      <PageFooter
        onSubmit={jest.fn()}
        readyToUpload={readyToUpload}
        resetAllData={jest.fn()}
        sendingFiles={sendingFiles}
        uploadProgress={uploadProgress}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiPaper-root pageFooter MuiPaper-elevation0"
    >
      <div
        className="MuiContainer-root MuiContainer-maxWidthLg"
      >
        <div
          className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
        >
          <div
            className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-8"
          >
            <p
              className="progressText"
            >
              Upload Complete
            </p>
            <div
              className="MuiBox-root MuiBox-root-7"
            >
              <div
                className="MuiBox-root MuiBox-root-8"
              >
                100
                %
              </div>
              <div
                className="MuiBox-root MuiBox-root-9"
              >
                <div
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={100}
                  className="MuiLinearProgress-root MuiLinearProgress-colorPrimary progressBar MuiLinearProgress-determinate"
                  role="progressbar"
                >
                  <div
                    className="MuiLinearProgress-bar MuiLinearProgress-barColorPrimary MuiLinearProgress-bar1Determinate"
                    style={
                      Object {
                        "transform": "translateX(0%)",
                      }
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="MuiGrid-root newUploadContainer MuiGrid-item MuiGrid-grid-xs-4"
          >
            <button
              className="MuiButtonBase-root MuiButton-root MuiButton-contained newSubjectDataUpload"
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
                New Subject Data Upload
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `)
})
