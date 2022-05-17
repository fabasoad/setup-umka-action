import itParam from 'mocha-param'
import os from 'os'
import CliExeNameProvider from '../CliExeNameProvider'
import { CLI_NAME } from '../consts'

interface IFixture {
  os: string
  execFileName: string
}

jest.mock('os')

describe('CliExeNameProvider::getExeFileName', () => {
  const items: IFixture[] = [{
    os: 'Windows_NT',
    execFileName: `${CLI_NAME}.exe`
  }, {
    os: 'Darwin',
    execFileName: CLI_NAME
  }, {
    os: 'Linux',
    execFileName: CLI_NAME
  }]

  beforeEach(() => {
    (os.type as jest.Mock).mockClear()
  })

  itParam('should return exe name successfully', items, (item: IFixture) => {
    (os.type as jest.Mock).mockImplementation(() => item.os)
    const provider: CliExeNameProvider = new CliExeNameProvider()
    const actual: string = provider.getExeFileName()
    expect(actual).toBe(item.execFileName)
  })
})
