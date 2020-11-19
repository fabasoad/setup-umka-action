import itParam from 'mocha-param'
import os from 'os'
import { restore, SinonStub, stub } from 'sinon'
import CliExeNameProvider from '../CliExeNameProvider'
import { CLI_NAME } from '../consts'

interface IFixture {
  os: string
  execFileName: string
}

describe('CliExeNameProvider', () => {
  let osTypeStub: SinonStub<[], string>

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
    osTypeStub = stub(os, 'type')
  })

  itParam('should return exe name successfully', items, (item: IFixture) => {
    osTypeStub.returns(item.os)
    const provider: CliExeNameProvider = new CliExeNameProvider()
    const actual: string = provider.getExeFileName()
    expect(actual).toBe(item.execFileName)
  })

  afterEach(() => restore())
})
