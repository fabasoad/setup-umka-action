import * as tc from '@actions/tool-cache'
import { restore, SinonStub, stub } from 'sinon'
import Downloader from '../Downloader'

describe('Downloader', () => {
  let downloadToolStub: SinonStub

  beforeEach(() => {
    downloadToolStub = stub(tc, 'downloadTool')
  })

  it('should download successfully', async () => {
    const zipPathExpected: string = 'yw86z9qw'
    const url: string = '9r1y2ryp'
    downloadToolStub.returns(Promise.resolve(zipPathExpected))
    const d: Downloader = new Downloader()
    const actual: string = await d.download(url)
    expect(actual).toBe(zipPathExpected)
  })

  afterEach(() => restore())
})
