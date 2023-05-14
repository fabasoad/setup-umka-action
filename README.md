# Setup Umka

[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://stand-with-ukraine.pp.ua)
![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-umka-action?include_prereleases)
![Functional Tests](https://github.com/fabasoad/setup-umka-action/workflows/Functional%20Tests/badge.svg)
![pre-commit](https://github.com/fabasoad/setup-umka-action/actions/workflows/pre-commit.yml/badge.svg)

This action sets up a [Umka](https://github.com/vtereshkov/umka-lang).

## Prerequisites

The following tools have to be installed for successful work of this GitHub action:
`unzip`.

> `Windows` and `Linux` are the only supported OS at this moment

## Inputs

<!-- prettier-ignore-start -->
| Name    | Required | Description                                                                             | Default | Possible values     |
|---------|----------|-----------------------------------------------------------------------------------------|---------|---------------------|
| version | No       | Umka version that can be found [here](https://github.com/vtereshkov/umka-lang/releases) | `1.0`   | `0.10`, `0.9`, etc. |
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
      - uses: actions/checkout@main
      - uses: fabasoad/setup-umka-action@main
      - name: Run script
        run: umka ./hello-world.um
```

### Result

```text
Run umka ./hello-world.um
Hello World!
```
