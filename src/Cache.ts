import { addPath } from '@actions/core'
import { cacheDir } from '@actions/tool-cache'
import fs from 'fs'
import path from 'path'
import { Logger } from 'winston'
import CliExeNameProvider from './CliExeNameProvider'
import LoggerFactory from './LoggerFactory'

export default class Cache implements ICache {
  private readonly version: string
  private readonly provider: ICliExeNameProvider
  private readonly log: Logger = LoggerFactory.create(Cache.name)

  constructor(
    version: string,
    provider: ICliExeNameProvider = new CliExeNameProvider()) {
    this.version = version
    this.provider = provider
  }

  async cache(execFilePath: string): Promise<void> {
    fs.chmodSync(execFilePath, '777')
    this.log.info(
      `Access permissions of ${execFilePath} file was changed to 777.`)
    const folderPath: string = path.dirname(execFilePath)
    const cachedPath = await cacheDir(
      folderPath, this.provider.getExeFileName(), this.version)
    this.log.info(`Cached dir is ${cachedPath}`)
    addPath(cachedPath)
  }
}
