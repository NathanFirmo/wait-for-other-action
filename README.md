<div align=center>

# Wait for other action

![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)
![version](https://img.shields.io/github/package-json/v/NathanFirmo/wait-for-other-action)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![build-test](https://github.com/NathanFirmo/wait-for-other-action/actions/workflows/test.yml/badge.svg)](https://github.com/NathanFirmo/wait-for-other-action/actions/workflows/test.yml)

This action provides a simple way to wait for a specific workflow to complete

</div>

## Usage

~~~yml
name: Wait 
uses: NathanFirmo/wait-for-other-action@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  workflow: 'workflow-filename.yml'
~~~


### Required Inputs
The following inputs are required to use this action:

| Input | Description |
| --- | --- |
| `token` | Your GitHub token. See more in [GitHub Docs](https://docs.github.com/en/actions/security-guides/automatic-token-authentication). |
| `workflow` | File name of the workflow you wanna wait for. |
