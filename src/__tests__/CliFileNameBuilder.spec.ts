import itParam from 'mocha-param'
import os from 'os'
import CliFileNameBuilder from '../CliFileNameBuilder'
import { CLI_NAME } from '../consts'

interface IFixture {
  os1: string
  os2: string
}

jest.mock('os')

describe('CliFileNameBuilder::build', () => {
  const expectedVersion: string = 'dy79bl7s'
  const items: IFixture[] = [{
    os1: 'Windows_NT',
    os2: 'windows_mingw'
  }, {
    os1: 'Linux',
    os2: 'linux'
  }]

  beforeEach(() => {
    (os.type as jest.Mock).mockClear()
  })

  itParam('should build successfully (${value.os1})',
    items, (item: IFixture) => {
      (os.type as jest.Mock).mockImplementation(() => item.os1)
      const b: CliFileNameBuilder = new CliFileNameBuilder(expectedVersion)
      expect(b.build())
        .toBe(`${CLI_NAME}_${expectedVersion}_x86-64_${item.os2}`)
    })

  it('should throw error on Mac OS', () => {
    const osType: string = 'cp0446ez';
    (os.type as jest.Mock).mockImplementation(() => osType)
    const b: CliFileNameBuilder = new CliFileNameBuilder(expectedVersion)
    try {
      b.build()
    } catch (e) {
      expect((<Error>e).message).toBe(`${osType} is not supported`)
      return
    }
    fail()
  })
})
