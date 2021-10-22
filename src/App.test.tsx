import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import App from './App'
import { fullStopErrors } from './constants'

jest.mock('./components/dedicated.worker', () => {
  return jest.fn()
})

jest.mock('./Services')

describe('App.tsx ', () => {
  it('renders full stop error when retrieving anon script fails', async () => {
    render(<App />)
    expect(await screen.findByText('Service Failure')).toBeInTheDocument()
    expect(
      await screen.findByText(
        fullStopErrors.PROJECTS_IRRETRIEVABLE.errorTextLine1,
      ),
    ).toBeInTheDocument()
  })
})
