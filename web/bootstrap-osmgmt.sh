#!/usr/bin/env bash
export DEBIAN_FRONTEND=noninteractive

sudo apt-get update
sudo apt-get -y upgrade

# Install tools for managing ppa repositories
sudo apt-get -y install software-properties-common
sudo apt-get -y install unzip
sudo apt-get -y install build-essential
sudo apt-get -y libssl-dev
sudo apt-get -y libffi-dev
sudo apt-get -y python-dev
sudo apt-get -y python-pip
sudo apt-get -y python3-pip

# Add graph builder tool for Terraform
sudo apt-get -y install graphviz

# Install Terraform
sudo apt-get update
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update
sudo apt-get -y install terraform

# Install Heroku cli
sudo snap install heroku --classic

# Clean up cached packages
sudo apt-get clean all

# Copy special files into /home/vagrant (from inside the mgmt node)
sudo chown -R vagrant:vagrant /home/vagrant
