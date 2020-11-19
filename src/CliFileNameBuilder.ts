import os from 'os'
import { CLI_NAME } from './consts'

export default class CliFileNameBuilder implements ICliFileNameBuilder {
  private version: string

  constructor(version: string) {
    this.version = version
  }

  private getOS(): string {
    const osType: string = os.type()
    switch (osType) {
    case 'Windows_NT':
      return 'windows_mingw'
    case 'Linux':
      return 'linux'
    default:
      throw new Error(`${osType} is not supported`)
    }
  }

  build(): string {
    return `${CLI_NAME}_${this.version}_x86-64_${this.getOS()}`
  }
}
