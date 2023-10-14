{
  description = "A Nix-flake-based Protobuf development environment";

  inputs.nixpkgs = {
    type = "github";
    owner = "ninjapanzer";
    repo = "nixpkgs";
    rev = "c84d406c951a8fc4ea746a683398335aaea86453";
  };

  outputs = { self, nixpkgs }:
    let
      supportedSystems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forEachSupportedSystem = f: nixpkgs.lib.genAttrs supportedSystems (system: f {
        pkgs = import nixpkgs { inherit system; };
      });
    in
    {
      devShells = forEachSupportedSystem ({ pkgs }: {
        default = pkgs.mkShell {
          packages = with pkgs; [ python3 awscli2 aws-sam-cli ruby_3_2 ];
        };
      });
    };
}
