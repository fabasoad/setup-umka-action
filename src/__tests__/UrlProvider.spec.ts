import itParam from 'mocha-param'
import semver, { SemVer } from 'semver'
import { restore, SinonStub, stub } from 'sinon'
import UrlProvider from '../UrlProvider'

interface IFixture {
  eq: boolean
  lt: boolean
  suffix: string
  verSuffix: string
}

describe('UrlProvider', () => {
  let semverEqStub: SinonStub<
    [v1: string | SemVer, v2: string | SemVer, loose?: boolean], boolean>
  let semverLtStub: SinonStub<
    [v1: string | SemVer, v2: string | SemVer, loose?: boolean], boolean>

  const expectedVersion: string = 'lp9ec2wv'
  const items: IFixture[] = [{
    suffix: '-alpha',
    lt: true,
    verSuffix: '.',
    eq: true
  }, {
    suffix: '',
    lt: false,
    verSuffix: '',
    eq: false
  }]

  beforeEach(() => {
    semverEqStub = stub(semver, 'eq')
    semverLtStub = stub(semver, 'lt')
  })

  itParam('should return url successfully (${value.lt}, ${value.eq})',
    items, (item: IFixture) => {
      semverLtStub.returns(item.lt)
      semverEqStub.returns(item.eq)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${item.verSuffix}${expectedVersion}${item.suffix}/` +
        `${fileName}.zip`)
      semverLtStub.calledOnceWithExactly(expectedVersion, '0.3.0')
    })

  itParam('should throw error on invalid semver (${value.lt}, ${value.eq})',
    items, (item: IFixture) => {
      const msg: string = `Invalid Version: ${expectedVersion}`
      semverLtStub.onCall(0).throws(new Error(msg))
      semverLtStub.onCall(1).returns(item.lt)
      semverEqStub.returns(item.eq)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${item.verSuffix}${expectedVersion}${item.suffix}/` +
        `${fileName}.zip`)
      expect(semverLtStub.calledTwice).toBe(true)
      semverLtStub.calledWithExactly(expectedVersion, '0.3.0')
      semverLtStub.calledWithExactly(`${expectedVersion}.0`, '0.3.0')
    })

  it('should throw error on non-semver', () => {
    const expectedError: Error = new Error('uj5p2t62')
    semverLtStub.throws(expectedError)
    const provider: UrlProvider = new UrlProvider(expectedVersion, {
      build: (): string => '3iy81j7i'
    })
    expect(() => provider.getUrl()).toThrow(expectedError)
    semverLtStub.calledOnceWithExactly(expectedVersion, '0.3.0')
  })

  afterEach(() => restore())
})
