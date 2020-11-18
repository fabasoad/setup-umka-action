import { lt } from 'semver'
import CliFileNameBuilder from './CliFileNameBuilder'

export default class UrlProvider implements IUrlProvider {
  private builder: ICliFileNameBuilder
  private version: string

  constructor(
    version: string,
    builder: ICliFileNameBuilder = new CliFileNameBuilder(version)) {
    this.version = version
    this.builder = builder
  }

  getUrl(): string {
    const suffix: string = lt(this.version, '0.3') ? '-alpha' : ''
    return 'https://github.com/vtereshkov/umka-lang/releases/download/v' +
      `${this.version}${suffix}/${this.builder.build()}.zip`
  }
}
