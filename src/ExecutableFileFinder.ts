import glob from 'glob'
import path from 'path'
import { Logger } from 'winston'
import CliExeNameProvider from './CliExeNameProvider'
import { CLI_NAME } from './consts'
import LoggerFactory from './LoggerFactory'

export default class ExecutableFileFinder implements IExecutableFileFinder {
  private readonly log: Logger = LoggerFactory.create(ExecutableFileFinder.name)
  private readonly provider: ICliExeNameProvider

  constructor(
    provider: ICliExeNameProvider = new CliExeNameProvider()) {
    this.provider = provider
  }

  find(folderPath: string): string {
    const pattern: string =
      `${folderPath}${path.sep}**${path.sep}${CLI_NAME}*`
    let files: string[] = glob.sync(pattern)
    this.log.info(`Files found by glob: ${files.join(', ')}`)
    files = files
      .filter((f: string) => f.endsWith(this.provider.getExeFileName()))
    if (files.length === 0) {
      throw new Error('Execution file has not been found under ' +
        `${folderPath} folder using ${pattern} pattern`)
    } else if (files.length > 1) {
      throw new Error('There are more than 1 execution file has been found ' +
        `under ${folderPath} folder using ${pattern} pattern: ${files}`)
    }
    this.log.info(`${CLI_NAME} path is ${files[0]}`)
    return files[0]
  }
}
