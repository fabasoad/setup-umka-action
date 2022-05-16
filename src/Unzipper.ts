import { extractZip } from '@actions/tool-cache'
import path from 'path'
import { Logger } from 'winston'
import { readdirSync } from 'fs'
import LoggerFactory from './LoggerFactory'

export default class Unzipper implements IUnzipper {
  private readonly ez: typeof extractZip
  private readonly log: Logger = LoggerFactory.create(Unzipper.name)

  constructor(ez: typeof extractZip = extractZip) {
    this.ez = ez
  }

  async unzip(zipPath: string): Promise<string> {
    const folderPath: string = await this.ez(zipPath, path.dirname(zipPath))
    this.log.info(`Unzipped ${zipPath} to ${folderPath}`)
    const files: string[] = readdirSync(folderPath);
    this.log.info(`Files: ${files.join(', ')}`)
    return folderPath
  }
}
