import { downloadTool } from '@actions/tool-cache'
import { Logger } from 'winston'
import { CLI_NAME } from './consts'
import LoggerFactory from './LoggerFactory'

export default class Downloader implements IDownloader {
  private log: Logger = LoggerFactory.create('Downloader')

  async download(url: string): Promise<string> {
    this.log.info(`Downloading ${CLI_NAME} from ${url}`)
    const zipPath: string = await downloadTool(url)
    this.log.info(`Downloaded to ${zipPath}`)
    return zipPath
  }
}
