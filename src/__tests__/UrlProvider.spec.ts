import itParam from 'mocha-param'
import semver, { SemVer } from 'semver'
import { restore, SinonStub, stub } from 'sinon'
import UrlProvider from '../UrlProvider'

interface IFixture {
  version: string
  lt: boolean
  suffix: string
  verSuffix: string
}

describe('UrlProvider', () => {
  let semverLtStub: SinonStub<
    [v1: string | SemVer, v2: string | SemVer, loose?: boolean], boolean>

  const items: IFixture[] = [{
    suffix: '-alpha',
    lt: true,
    verSuffix: '',
    version: 'lp9ec2wv'
  }, {
    suffix: '',
    lt: false,
    verSuffix: '.',
    version: '0.1'
  }]

  beforeEach(() => {
    semverLtStub = stub(semver, 'lt')
  })

  itParam('should return url successfully (${value.lt})',
    items, (item: IFixture) => {
      semverLtStub.returns(item.lt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(item.version, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${item.verSuffix}${item.version}${item.suffix}/` +
        `${fileName}.zip`)
      semverLtStub.calledOnceWithExactly(item.version, '0.3.0')
    })

  itParam('should throw error on invalid semver (${value.lt})',
    items, (item: IFixture) => {
      const msg: string = `Invalid Version: ${item.version}`
      semverLtStub.onCall(0).throws(new Error(msg))
      semverLtStub.onCall(1).returns(item.lt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(item.version, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${item.verSuffix}${item.version}${item.suffix}/` +
        `${fileName}.zip`)
      expect(semverLtStub.calledTwice).toBe(true)
      semverLtStub.calledWithExactly(item.version, '0.3.0')
      semverLtStub.calledWithExactly(`${item.version}.0`, '0.3.0')
    })

  it('should throw error on non-semver', () => {
    const version: string = 'rs3cj88e'
    const expectedError: Error = new Error('uj5p2t62')
    semverLtStub.throws(expectedError)
    const provider: UrlProvider = new UrlProvider(version, {
      build: (): string => '3iy81j7i'
    })
    expect(() => provider.getUrl()).toThrow(expectedError)
    semverLtStub.calledOnceWithExactly(version, '0.3.0')
  })

  afterEach(() => restore())
})
