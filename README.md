# Setup Umka

![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-umka-action?include_prereleases) ![CI (latest)](https://github.com/fabasoad/setup-umka-action/workflows/CI%20(latest)/badge.svg) ![CI (main)](https://github.com/fabasoad/setup-umka-action/workflows/CI%20(main)/badge.svg) ![YAML Lint](https://github.com/fabasoad/setup-umka-action/workflows/YAML%20Lint/badge.svg) [![Total alerts](https://img.shields.io/lgtm/alerts/g/fabasoad/setup-umka-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/setup-umka-action/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fabasoad/setup-umka-action.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fabasoad/setup-umka-action/context:javascript) [![Maintainability](https://api.codeclimate.com/v1/badges/5dca8758e09a0aed2150/maintainability)](https://codeclimate.com/github/fabasoad/setup-umka-action/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5dca8758e09a0aed2150/test_coverage)](https://codeclimate.com/github/fabasoad/setup-umka-action/test_coverage) [![Known Vulnerabilities](https://snyk.io/test/github/fabasoad/setup-umka-action/badge.svg?targetFile=package.json)](https://snyk.io/test/github/fabasoad/setup-umka-action?targetFile=package.json)

This action sets up a [Umka](https://github.com/vtereshkov/umka-lang).

## Inputs

| Name    | Required | Description                                                                             | Default | Possible values |
|---------|----------|-----------------------------------------------------------------------------------------|---------|-----------------|
| version | Yes      | Umka version that can be found [here](https://github.com/vtereshkov/umka-lang/releases) |         | &lt;String&gt;  |

## Example usage

Let's try to run `hello-world.um` file with the following content:

```c
printf("Hello World!")
```

### Workflow configuration

```yaml
name: Setup Umka

on: push

jobs:
  setup:
    name: Setup
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@main
      - uses: fabasoad/setup-umka-action@main
        with:
          version: 0.3.3
      - name: Run script
        run: umka ./hello-world.um
```

### Result

```shell
Run umka ./hello-world.um
Hello World!
```
