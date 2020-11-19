import { lt } from 'semver'
import CliFileNameBuilder from './CliFileNameBuilder'

export default class UrlProvider implements IUrlProvider {
  private ALPHA_VERSION_BORDER: string = '0.3.0'

  private builder: ICliFileNameBuilder
  private version: string

  constructor(
    version: string,
    builder: ICliFileNameBuilder = new CliFileNameBuilder(version)) {
    this.version = version
    this.builder = builder
  }

  getUrl(): string {
    let isAlpha: boolean = false
    try {
      isAlpha = lt(this.version, this.ALPHA_VERSION_BORDER)
    } catch (e) {
      if ((<Error>e).message === `Invalid Version: ${this.version}`) {
        isAlpha = lt(`${this.version}.0`, this.ALPHA_VERSION_BORDER)
      } else {
        throw e
      }
    }
    const suffix: string = isAlpha ? '-alpha' : ''
    return 'https://github.com/vtereshkov/umka-lang/releases/download/v' +
      `${this.version}${suffix}/${this.builder.build()}.zip`
  }
}
