# SAM Tester

The purpose of this project is to help speed up evaluating API Gateway that call lambda functions and include an authorizer.

You will wanna look in the sam-app directory, it contains a `template.yaml` which constructs this for the __sam-cli__

The Sam CLI provides a local interface for running API-GATEWAY and AWS LAMBDAs. It includes support for custom authorizers.

## Usage

This expects you will setup your env with __nix__ and if you want simplicity you will use __direnv__ as well.

### Install Nix
`sh <(curl -L https://nixos.org/nix/install)`
`echo 'experimental-features = nix-command flakes' >> /etc/nix/nix.conf`

### Using Direnv
if you ae using direnv don't forget to `direnv allow` in this directory

### Enter Shell
Without direnv you can access the env with
`nix develop` which will launch a subshell with path modified to include ruby 3.2, node 18 and aws-sam-cli

### Setup
start by building the aws images this will require docker running

#### Create a token and signing key
head over to something like http://jwtbuilder.jamiekurtz.com/

If using above add `tenant` under "additional claims"

In the "Signed JSON Web Token" capture the "Key" and replace the `key` variable in `sam-app/authorizer/authorizer.js`

#### Build

`cd sam-app`
`sam build`

#### Run
`sam local start-api`

#### Test
Take the ke you generated and add it to he Authorization header of a call with curl

```curl
curl http://127.0.0.1:3000 -H "Authorization: <KEY HERE>"

```

You will get a response like
```json
{"message":"Hello World!","sub":"jrocket@example.com","tenant":"14"}
```

where tenant will be the value you supplied to your token along with the subject
