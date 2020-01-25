# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.DEFAULT_SERVER_URL.replace('https://vagrantcloud.com')

    config.vm.box = "hashicorp/bionic64"
    config.vm.network "forwarded_port", guest: 3080, host: 80

    # Create a private network, which allows host-only access to the machine
    # using a specific IP.
    # config.vm.network "private_network", ip: "192.168.33.10"

    # Create a public network, which generally matched to bridged network.
    # Bridged networks make the machine appear as another physical device on
    # your network.
    # config.vm.network "public_network"

    # Share an additional folder to the guest VM. The first argument is
    # the path on the host to the actual folder. The second argument is
    # the path on the guest to mount the folder. And the optional third
    # argument is a set of non-required options.
    # config.vm.synced_folder "../data", "/vagrant_data"

    # Provider-specific configuration so you can fine-tune various
    # backing providers for Vagrant. These expose provider-specific options.
    # Example for VirtualBox:
    #
    # config.vm.provider "virtualbox" do |vb|
    #   # Display the VirtualBox GUI when booting the machine
    #   vb.gui = true
    #
    #   # Customize the amount of memory on the VM:
    #   vb.memory = "1024"
    # end
    #
    # View the documentation for the provider you are using for more
    # information on available options.

    # Enable provisioning with a shell script. Additional provisioners such as
    # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
    # documentation for more information about their specific syntax and use.
    config.vm.provision "shell", inline: <<-SHELL
        DEBIAN_FRONTEND=noninteractive apt-get update \
            && apt-get -y install build-essential python ruby wget \
            && apt-get -y install libncurses5-dev libc6-dev libc-dev g++ libnspr4-dev git cvs dosemu \
            && apt-get -y install pkg-config libzip-dev libsdl-kitchensink-dev zip unzip apt-utils \
            && apt-get -y install libmozjs-38-dev libmozjs-52-dev libcap2-dev lrzsz vim nodejs npm \ 
            && wget http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/terminfo \
            && wget http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/termcap \
            && tic terminfo && cat termcap >> /etc/termcap \
            && wget 'http://cvs.synchro.net/cgi-bin/viewcvs.cgi/*checkout*/install/GNUmakefile' \
            && make install SYMLINK=1 USE_DOSEMU=1 \
            && apt-get -y autoremove
    SHELL
end
