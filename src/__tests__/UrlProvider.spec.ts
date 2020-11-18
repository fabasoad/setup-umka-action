import itParam from 'mocha-param'
import semver, { SemVer } from 'semver'
import { restore, SinonStub, stub } from 'sinon'
import UrlProvider from '../UrlProvider'

interface IFixture {
  expectedSemverLt: boolean
  suffix: string
}

describe('UrlProvider', () => {
  let semverLtStub: SinonStub<
    [v1: string | SemVer, v2: string | SemVer, loose?: boolean], boolean>

  const expectedVersion: string = 'lp9ec2wv'
  const items: IFixture[] = [{
    suffix: '-alpha',
    expectedSemverLt: true
  }, {
    suffix: '',
    expectedSemverLt: false
  }]

  beforeEach(() => {
    semverLtStub = stub(semver, 'lt')
  })

  itParam('should return url successfully (${value.suffix})',
    items, (item: IFixture) => {
      semverLtStub.returns(item.expectedSemverLt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
      `download/v${expectedVersion}${item.suffix}/${fileName}.zip`)
      semverLtStub.calledOnceWithExactly(expectedVersion, '0.3')
    })

  afterEach(() => restore())
})
