import renderer from 'react-test-renderer'
import UploadButton from './UploadButton'
import { dateTimeErrors } from '../../myTypes'

it('renders disabled and without dateTime errors', () => {
  const onFileUpload = jest.fn()
  const isUploadDisabled = true
  const totalVolume = 0
  const totalFiles = 0
  const numOfAnonomyzedFiles = 0
  const fileCheck: dateTimeErrors = {
    dateTimeError: false,
    studyInstanceUidError: false,
  }

  const tree = renderer
    .create(
      <UploadButton
        onFileUpload={onFileUpload}
        isUploadDisabled={isUploadDisabled}
        totalVolume={totalVolume}
        totalFiles={totalFiles}
        numOfAnonomyzedFiles={numOfAnonomyzedFiles}
        fileCheck={fileCheck}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6"
      >
        <div
          className="MuiPaper-root MuiPaper-elevation5 MuiPaper-rounded"
        >
          <section
            className="centerText disabled"
          >
            <div
              onBlur={null}
              onClick={null}
              onDragEnter={null}
              onDragLeave={null}
              onDragOver={null}
              onDrop={null}
              onFocus={null}
              onKeyDown={null}
            >
              <input
                autoComplete="off"
                multiple={true}
                onChange={null}
                onClick={null}
                style={
                  Object {
                    "display": "none",
                  }
                }
                tabIndex={-1}
                type="file"
              />
              <p>
                Fill out the above fields to upload files
              </p>
            </div>
          </section>
        </div>
      </div>
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6"
      >
        <p>
          <b>
            0 B
          </b>
           total upload size
        </p>
        <p>
          <b>
            0
          </b>
           file(s) selected
        </p>
        <p>
          <b>
            0
          </b>
           file(s) anonymized
        </p>
      </div>
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"
      />
    </div>
  `)
})

it('renders enabled and without dateTime errors', () => {
  const onFileUpload = jest.fn()
  const isUploadDisabled = false
  const totalVolume = 0
  const totalFiles = 0
  const numOfAnonomyzedFiles = 0
  const fileCheck: dateTimeErrors = {
    dateTimeError: false,
    studyInstanceUidError: false,
  }

  const tree = renderer
    .create(
      <UploadButton
        onFileUpload={onFileUpload}
        isUploadDisabled={isUploadDisabled}
        totalVolume={totalVolume}
        totalFiles={totalFiles}
        numOfAnonomyzedFiles={numOfAnonomyzedFiles}
        fileCheck={fileCheck}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div
      className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
    >
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6"
      >
        <div
          className="MuiPaper-root MuiPaper-elevation5 MuiPaper-rounded"
        >
          <section
            className="centerText "
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
              <p>
                Drag'n'drop some files here, or click to select files
              </p>
            </div>
          </section>
        </div>
      </div>
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-6"
      >
        <p>
          <b>
            0 B
          </b>
           total upload size
        </p>
        <p>
          <b>
            0
          </b>
           file(s) selected
        </p>
        <p>
          <b>
            0
          </b>
           file(s) anonymized
        </p>
      </div>
      <div
        className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12"
      />
    </div>
  `)
})
