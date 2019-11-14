# ens-updater

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Set records of ENS names from the commandline

This tool enables automated update of e.g. contentHash records in the Ethereum Name System. 
Goal is to integrate well in deployment scripts or CI environments. 


## Table of Contents

- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Security
In order to perform an update of an ENS record, `ens-update` needs the private keys of the
Ethereum account controlling the ENS name. The private keys are derived from the the mnemonic
provided through a `.env` file in the working directory. 

Example contents of `.env`:
```bash
MNEMONIC=fit repeat flame beauty knife cereal urge amateur steak thought denial negative
```
Remember - The mnemonic gives full control to all accounts of the according wallet!

- **NEVER share this file with anybody**
- **NEVER check it into version control**
- **NEVER publish in any other way**

## Background
For information on the Ethereum Name System see the [ENS documentation](https://docs.ens.domains/).

## Install

```
npm install -g @triplespeeder/ens-updater
```

## Usage
At the moment only the command setContenthash is implemented. PRs to extend functionality are welcome :)
```
 > ens-updater setContenthash
ens-updater setContenthash

Set the contenthash for an ENS name

Options:
  --version              Show version number                           [boolean]
  --web3                 Web3 connection string              [string] [required]
  --accountindex, -i     Account index. Defaults to 0      [number] [default: 0]
  --ensname, --ens       ENS Name to update                  [string] [required]
  --contenttype, --type  Type of content hash to set (ipfs-ns, swarm-ns, ...)
                                                             [string] [required]
  --contenthash, --hash  Content hash to set                 [string] [required]
  --dry-run              Do not perform any real transactions
                                                      [boolean] [default: false]
  --quiet, -q            Suppress console output. Set this when running from a
                         script/CI environment        [boolean] [default: false]
  --registryaddress      Optional contract address of the ENS Registry. [string]
  --help, -h             Show help                                     [boolean]
```

#### Example
On Ropsten network, set the contentHash of the name `ens-updater.eth` to the IPFS CID `QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU`:
```shell script
> ens-updater setContenthash --ensname ens-updater.eth --contenttype ipfs-ns --contenthash QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU --web3 http://ropsten.dappnode:8545
Setting up web3 & HDWallet provider...
        Running on chain ID 3
Verifying ensName owner
Verifying content hash...
Updating contenthash...
        Successfully stored new contentHash. Transaction hash: 0x0b8cdb75ff3b514c974ccd0bdef7cc3557bfab934b39caba30c38b88d375d705.
Exiting...
> 
```

#### Reading values from stdin
Setting the value "stdin" for option `contenthash` reads the contenthash from stdin. This is useful
to build a chain of commands in a deploy script. E.g. you can use ipfs-deploy to upload data to IPFS
and directly pipe the CID returned by ipfs-deploy into ens-updater:

```shell script
> echo -n "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU" | ens-updater setContenthash --contenttype ipfs-ns --contenthash stdin --ensname ens-updater.eth --web3 http://ropsten.dappnode:8545
Getting contenthash from stdin...
         Got contenthash: QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU.
Setting up web3 & HDWallet provider...
...
```

## Maintainers

[@TripleSpeeder](https://github.com/TripleSpeeder)

## Contributing

PRs are welcome! Have a look at the [open issues](https://github.com/TripleSpeeder/ens-updater/issues) or create a new 
issue if you are missing functionality.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT 

© 2019 Michael Bauer