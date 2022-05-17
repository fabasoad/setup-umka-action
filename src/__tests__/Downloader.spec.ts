import * as tc from '@actions/tool-cache'
import Downloader from '../Downloader'

const zipPathExpected: string = 'yw86z9qw'
jest.mock('@actions/tool-cache', () => ({
  downloadTool: jest.fn(() => Promise.resolve(zipPathExpected))
}))

describe('Downloader::download', () => {
  beforeEach(() => {
    (tc.downloadTool as jest.Mock).mockClear()
  })

  it('should download successfully', async () => {
    const url: string = '9r1y2ryp'
    const d: Downloader = new Downloader()
    const actual: string = await d.download(url)
    expect(actual).toBe(zipPathExpected)
  })
})
