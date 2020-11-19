import os from 'os'
import { CLI_NAME } from './consts'

export default class CliExeNameProvider implements ICliExeNameProvider {
  getExeFileName(): string {
    switch (os.type()) {
    case 'Windows_NT':
      return `${CLI_NAME}.exe`
    default:
      return CLI_NAME
    }
  }
}
