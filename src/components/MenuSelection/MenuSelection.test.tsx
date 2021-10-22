import renderer from 'react-test-renderer'
import MenuSelection from './MenuSelection'

it('renders with a placeholder', () => {
  const emptyOptionText = 'Select Performance Site'
  const field = 'project'
  const label = <>{'Performance Site ID'}</>
  const menuOptions = ['project 1', 'project 2']
  const value = ''

  const tree = renderer
    .create(
      <MenuSelection
        emptyOptionText={emptyOptionText}
        field={field}
        handleOnChange={jest.fn()}
        label={label}
        menuOptions={menuOptions}
        value={value}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
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
  `)
})

it('renders with a selected option', () => {
  const emptyOptionText = 'Select Performance Site'
  const field = 'project'
  const label = <>{'Performance Site ID'}</>
  const menuOptions = ['project 1', 'project 2']
  const value = 'project 1'

  const tree = renderer
    .create(
      <MenuSelection
        emptyOptionText={emptyOptionText}
        field={field}
        handleOnChange={jest.fn()}
        label={label}
        menuOptions={menuOptions}
        value={value}
      />,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
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
  `)
})
