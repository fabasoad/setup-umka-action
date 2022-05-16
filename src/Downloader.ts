import { downloadTool } from '@actions/tool-cache'
import { Logger } from 'winston'
import { CLI_NAME } from './consts'
import LoggerFactory from './LoggerFactory'

export default class Downloader implements IDownloader {
  private readonly log: Logger = LoggerFactory.create(Downloader.name)

  async download(url: string): Promise<string> {
    this.log.info(`Downloading ${CLI_NAME} from ${url}`)
    const filePath: string = await downloadTool(url, './')
    this.log.info(`Downloaded to ${filePath}`)
    return filePath
  }
}
