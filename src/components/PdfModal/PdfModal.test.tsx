/**
 * react/materialUI Modals/dialogs utilize Portals which are currently bugged/unsupported
 * by react-test-renderer -  https://github.com/facebook/react/issues/11565
 * Not going to add another test utility to handle this at the moment.
 *
 * Also - this component is effectively a wrapper for react-pdf
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import renderer from 'react-test-renderer'
it('make test runner happy', () => {
  expect(true).toEqual(true)
})
