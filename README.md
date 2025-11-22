# Setup Umka

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)
![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-umka-action?include_prereleases)
![functional-tests](https://github.com/fabasoad/setup-umka-action/actions/workflows/functional-tests.yml/badge.svg)
![security](https://github.com/fabasoad/setup-umka-action/actions/workflows/security.yml/badge.svg)
![linting](https://github.com/fabasoad/setup-umka-action/actions/workflows/linting.yml/badge.svg)

This action sets up [Umka](https://github.com/vtereshkov/umka-lang).

## Supported OS

<!-- prettier-ignore-start -->
| OS      |                    |
|---------|--------------------|
| Windows | :white_check_mark: |
| Linux   | :white_check_mark: |
| macOS   | :x:                |
<!-- prettier-ignore-end -->

## Prerequisites

None.

## Inputs

```yaml
- uses: fabasoad/setup-umka-action@v1
  with:
    # (Optional) Umka version. Defaults to the latest version.
    version: "1.5.4"
    # (Optional) If "false" skips installation if umka is already installed. If
    # "true" installs umka in any case. Defaults to "false".
    force: "false"
    # (Optional) GitHub token that is used to send requests to GitHub API such
    # as downloading asset. Defaults to the token provided by GitHub Actions
    # environment.
    github-token: "${{ github.token }}"
```

## Outputs

<!-- prettier-ignore-start -->
| Name      | Description                       | Example |
|-----------|-----------------------------------|---------|
| installed | Whether umka was installed or not | `true`  |
<!-- prettier-ignore-end -->

## Example usage

Let's try to run `hello-world.um` file with the following content:

```rust
fn main() {
    printf("Hello World!")
}
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
      - uses: actions/checkout@v5
      - uses: fabasoad/setup-umka-action@v1
      - name: Run script
        run: umka ./hello-world.um
```

### Result

```text
Run umka ./hello-world.um
Hello World!
```

## Contributions

![Alt](https://repobeats.axiom.co/api/embed/e31d86e6918863b220dc3cc4123dde1567c84505.svg "Repobeats analytics image")
