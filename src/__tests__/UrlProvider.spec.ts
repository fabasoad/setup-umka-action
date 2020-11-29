import itParam from 'mocha-param'
import semver, { SemVer } from 'semver'
import { restore, SinonStub, stub } from 'sinon'
import UrlProvider from '../UrlProvider'

interface IFixture {
  lt: boolean
  suffix: string
}

describe('UrlProvider', () => {
  const expectedVersion: string = 'lp9ec2wv'
  let semverLtStub: SinonStub<
    [v1: string | SemVer, v2: string | SemVer, loose?: boolean], boolean>

  const items: IFixture[] = [{
    suffix: '-alpha',
    lt: true
  }, {
    suffix: '',
    lt: false
  }]

  beforeEach(() => {
    semverLtStub = stub(semver, 'lt')
  })

  itParam('should return url successfully (${value.lt})',
    items, (item: IFixture) => {
      semverLtStub.returns(item.lt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${expectedVersion}${item.suffix}/` +
        `${fileName}.zip`)
      expect(semverLtStub.withArgs(expectedVersion, '0.3.0').callCount).toBe(1)
    })

  itParam('should throw error on invalid semver (${value.lt})',
    items, (item: IFixture) => {
      const msg: string = `Invalid Version: ${expectedVersion}`
      semverLtStub.onCall(0).throws(new Error(msg))
      semverLtStub.onCall(1).returns(item.lt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${expectedVersion}${item.suffix}/` +
        `${fileName}.zip`)
      expect(semverLtStub.calledTwice).toBe(true)
      expect(semverLtStub.withArgs(expectedVersion, '0.3.0').callCount).toBe(1)
      expect(semverLtStub.withArgs(`${expectedVersion}.0`, '0.3.0').callCount)
        .toBe(1)
    })

  it('should throw error on non-semver', () => {
    const version: string = 'rs3cj88e'
    const expectedError: Error = new Error('uj5p2t62')
    semverLtStub.throws(expectedError)
    const provider: UrlProvider = new UrlProvider(version, {
      build: (): string => '3iy81j7i'
    })
    expect(() => provider.getUrl()).toThrow(expectedError)
    expect(semverLtStub.withArgs(version, '0.3.0').callCount).toBe(1)
  })

  afterEach(() => restore())
})
