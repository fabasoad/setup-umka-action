import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import fs from 'fs'
import path from 'path'
import Cache from '../Cache'

const CACHED_PATH: string = '1r4wn1iw'

jest.mock('fs')
jest.mock('@actions/core', () => ({
  addPath: jest.fn()
}))
jest.mock('@actions/tool-cache', () => ({
  cacheDir: jest.fn(() => Promise.resolve(CACHED_PATH))
}))

describe('Cache::cache', () => {
  beforeEach(() => {
    (core.addPath as jest.Mock).mockClear();
    (tc.cacheDir as jest.Mock).mockClear();
    (fs.chmodSync as jest.Mock).mockClear();
  })

  it('should cache successfully', async () => {
    const version: string = 'ey1r6c00'
    const exeFileName: string = 'O7DF0gox'
    const getExeFileNameMock: jest.Mock<string, []> = jest.fn(() => exeFileName)
    const folderPath: string = '1ef84ehe'
    const execFilePath: string = path.join(folderPath, 'm8x9p1sw')
    const cache: Cache = new Cache(version, {
      getExeFileName: getExeFileNameMock
    })
    await cache.cache(execFilePath)

    expect(getExeFileNameMock.mock.calls.length).toBe(1)
    expect(fs.chmodSync).toHaveBeenCalledWith(execFilePath, '777')
    expect(fs.chmodSync).toHaveBeenCalledTimes(1)
    expect(tc.cacheDir).toHaveBeenCalledWith(folderPath, exeFileName, version)
    expect(tc.cacheDir).toHaveBeenCalledTimes(1)
    expect(core.addPath).toHaveBeenCalledWith(CACHED_PATH)
    expect(core.addPath).toHaveBeenCalledTimes(1)
  })
})
