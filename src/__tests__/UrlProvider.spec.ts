import itParam from 'mocha-param'
import { lt } from 'semver'
import UrlProvider from '../UrlProvider'

interface IFixture {
  lt: boolean
  suffix: string
}

jest.mock('semver', () => ({
  lt: jest.fn()
}))

describe('UrlProvider', () => {
  const expectedVersion: string = 'lp9ec2wv'

  const items: IFixture[] = [{
    suffix: '-alpha',
    lt: true
  }, {
    suffix: '',
    lt: false
  }]

  afterEach(() => {
    (lt as jest.Mock).mockClear()
  })

  itParam('should return url successfully (${value.lt})',
    items, (item: IFixture) => {
      (lt as jest.Mock).mockImplementation(() => item.lt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${expectedVersion}${item.suffix}/` +
        `${fileName}.zip`)
      expect((lt as jest.Mock).mock.calls.length).toBe(1)
      expect(lt).toHaveBeenCalledWith(expectedVersion, '0.3.0')
    })

  itParam('should throw error on invalid semver (${value.lt})',
    items, (item: IFixture) => {
      const msg: string = `Invalid Version: ${expectedVersion}`;
      (lt as jest.Mock).mockImplementationOnce(() => {
        throw new Error(msg)
      }).mockImplementationOnce(() => item.lt)
      const fileName: string = '3iy81j7i'
      const provider: UrlProvider = new UrlProvider(expectedVersion, {
        build: (): string => fileName
      })
      const actual: string = provider.getUrl()
      expect(actual).toBe('https://github.com/vtereshkov/umka-lang/releases/' +
        `download/v${expectedVersion}${item.suffix}/` +
        `${fileName}.zip`)
      expect((lt as jest.Mock).mock.calls.length).toBe(2)
      expect(lt).toHaveBeenCalledWith(expectedVersion, '0.3.0')
      expect(lt).toHaveBeenCalledWith(`${expectedVersion}.0`, '0.3.0')
    })

  it('should throw error on non-semver', () => {
    const version: string = 'rs3cj88e'
    const expectedError: Error = new Error('uj5p2t62');
    (lt as jest.Mock).mockImplementation(() => {
      throw expectedError
    })
    const provider: UrlProvider = new UrlProvider(version, {
      build: (): string => '3iy81j7i'
    })
    expect(() => provider.getUrl()).toThrow(expectedError)
    expect((lt as jest.Mock).mock.calls.length).toBe(1)
    expect(lt).toHaveBeenCalledWith(version, '0.3.0')
  })

  afterEach(() => (lt as jest.Mock).mockClear())
})
