# Setup Umka

![GitHub release](https://img.shields.io/github/v/release/fabasoad/setup-umka-action?include_prereleases)
![Functional Tests](https://github.com/fabasoad/setup-umka-action/workflows/Functional%20Tests/badge.svg)
[![pre-commit.ci status](https://results.pre-commit.ci/badge/github/fabasoad/setup-umka-action/main.svg)](https://results.pre-commit.ci/latest/github/fabasoad/setup-umka-action/main)

This action sets up a [Umka](https://github.com/vtereshkov/umka-lang).

## Inputs

| Name    | Required | Description                                                                             | Default | Possible values     |
|---------|----------|-----------------------------------------------------------------------------------------|---------|---------------------|
| version | No       | Umka version that can be found [here](https://github.com/vtereshkov/umka-lang/releases) | `0.9`   | `0.5.3`, `0.8` etc. |

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
